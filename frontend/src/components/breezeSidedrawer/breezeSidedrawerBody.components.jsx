import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import { HTTPStatusCode } from "@Constants/network";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import { ChatDAO } from "@Modules/chat/core/chatDAO";
import { ChatState } from "@Context/chatProvider";

const BreezeSideDrawerBody = ({ onClose }) => {
	const {
		setSelectedChat,
		user,
		notification,
		setNotification,
		chats,
		setChats,
	} = ChatState();

	const [isGroupChat, setGroupChat] = useState(false);
	const [userList, setUserList] = useState([]);
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
	}, []);

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
		<div className='p-2'>
			<h2 className='text-fontsize-pearl text-color-darkTeal font-bold m-4'>
				Create chat
			</h2>
			<div className='w-100% mt-10 px-4'>
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
			<div className='w-100% mt-10 px-4'>
				{isLoading ? (
					<BreezeTileSkeleton tileLength={6} />
				) : (
					userList?.map((item) => {
						return (
							<BreezeTile
								onClickHandler={() => onCreateChatHandler(item?._id)}
								title={item?.name}
								imgBackgroundColor={item?.imgBackgroundColor}
								msg={item?.msg}
								isActive={item?.isActive}
								isGrouped={item?.isGrouped}
								profileImage={item?.profileImage}
								isNotification={item?.isNotification}
								bio={item?.bio}
								styleClass={
									"bg-white py-4 rounded-2xl transform hover:scale-105  hover:shadow-sm transition duration-300 ease-in-out"
								}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default BreezeSideDrawerBody;
