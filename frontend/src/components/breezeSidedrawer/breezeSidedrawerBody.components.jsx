import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { MdInfo } from "react-icons/md";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import { HTTPStatusCode } from "@Constants/network";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import { ChatDAO } from "@Modules/chat/core/chatDAO";
import { useChatState } from "@Context/chatProvider";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";

const BreezeSideDrawerBody = ({ onClose, onModalClose, onModalOpen }) => {
	const { setSelectedChat, userList, setUserList, chats, setChats } =
		useChatState();

	const [isLoading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	/** Getting All Users list from Chat API */
	const getAllUsers = useCallback(async () => {
		setLoading(true);
		const response = await userDAO.getAllUsersDAO();
		if (response?.statusCode === HTTPStatusCode.OK) {
			setUserList(response?.responseBody || []);
			setLoading(false);
		}
	}, [setUserList]);

	/** Creating Chat from Sidebar  */
	const onCreateChatHandler = useCallback(
		async (id) => {
			setLoading(true);
			const response = await ChatDAO.createChatDAO({ userID: id });
			if (response?.statusCode === HTTPStatusCode.OK) {
				const data = response?.responseBody;
				if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
				setSelectedChat(data);
				setLoading(false);
				onClose();
			}
		},
		[chats, onClose, setChats, setSelectedChat]
	);

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);
	return (
		<div className='p-2 '>
			<div className='flex mt-10 w-95% mx-auto items-center justify-between px-4'>
				<div>
					<h2 className=' drop-shadow-md text-fontsize-pearl text-color-darkTeal font-bold'>
						Create chat
					</h2>

					<div className='text-sm text-gray-400 tracking-normal flex items-center gap-1'>
						<span>
							<MdInfo />{" "}
						</span>
						<span>Click on users to create chat.</span>
					</div>
				</div>
				<BreezeTooltip id={"createGroupChat"}>
					<button
						onClick={onModalOpen}
						title='Group Chat'
						className='
									cursor-pointer
									bg-color-darkTeal
									w-10 h-10
									outline-none
									rounded-xl 
									flex justify-center items-center
									text-white text-4xl relative
								'>
						<span
							data-tooltip-id='createGroupChat'
							data-tooltip-content='Create Group Chat'>
							<BsPlusLg
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-trim)`,
									fontWeight: 900,
								}}
							/>
						</span>
					</button>
				</BreezeTooltip>
			</div>

			<div className='w-95% mx-auto drop-shadow-md mt-10 px-4'>
				<BreezeSearch
					placeholder={"Search user"}
					leadingIcon={
						<BiSearch
							style={{
								color: `var(--color-darkTeal)`,
								fontSize: `var(--fontsize-glossy)`,
							}}
						/>
					}
					register={register}
					name='searchUser'
				/>
			</div>
			<div
				className='w-100% mx-auto  mt-5 px-4 '
				style={{
					minHeight: "75vh",
				}}>
				{isLoading ? (
					<BreezeTileSkeleton tileLength={6} />
				) : (
					<div
						className=' rounded-2xl'
						style={{
							maxHeight: "73vh",
							minHeight: "73vh",
							overflowY: "scroll",
						}}>
						{userList?.map((item) => {
							return (
								<BreezeTile
									onClickHandler={() => onCreateChatHandler(item?._id)}
									title={item?.name}
									imgBackgroundColor={item?.imgBackgroundColor}
									msg={item?.msg}
									isActive={true}
									isGrouped={item?.isGrouped}
									profileImage={item?.profileImage}
									isNotification={item?.isNotification}
									bio={item?.bio}
									styleClass={
										"bg-white w-95% mx-auto  py-4 rounded-2xl transform  hover:bg-color-TealWithOpacity transition duration-300 ease-in-out"
									}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default BreezeSideDrawerBody;
