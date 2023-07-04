import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import { ChatState } from "@Context/chatProvider";
import BreezeDropdown from "@Components/breezeDropdown/breezeDropdown.components";
import { profileDropdown, profileMenuType } from "@Constants/application";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import BreezeRoutes from "@Constants/routes";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeSideDrawerBody from "@Components/breezeSidedrawer/breezeSidedrawerBody.components";
import { ChatDAO } from "../core/chatDAO";
import { HTTPStatusCode } from "@Constants/network";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";

const ChatScreen = () => {
	const navigate = useNavigate();
	const [isLoading, setLoading] = useState(false);
	const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
		ChatState();

	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	const [isOpen, setIsOpen] = useState(false);
	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => {
		setIsOpen(false);
	};

	const onFetchChatHandler = useCallback(async () => {
		setLoading(true);
		const response = await ChatDAO.fetchChatDAO(user?._id);
		if (response?.statusCode === HTTPStatusCode.OK) {
			setChats(response?.responseBody);
			setLoading(false);
		}
	}, [setChats, user?._id]);
	const onLogoutHandler = useCallback(() => {
		const res = userDAO.logoutDAO();
		if (res) navigate(BreezeRoutes.LOGINROUTE);
	}, [navigate]);

	useEffect(() => {
		onFetchChatHandler();
	}, [onFetchChatHandler]);
	return (
		<div className='flex gap-5'>
			<div className='sm:w-100% md:w-40% lg:w-30%'>
				<div className=' flex items-center justify-between'>
					<div className='w-70%'>
						<BreezeSearch
							placeholder={"Search chat"}
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
					<div>
						<BreezeTooltip id={"createChat"}>
							<button
								onClick={openModal}
								title='Create Chat'
								className='
                                cursor-pointer
                                bg-color-darkTeal
                                w-10 h-10
                                rounded-full 
                                flex justify-center items-center
                            text-white text-4xl 
                                '>
								<span
									data-tooltip-id='createChat'
									data-tooltip-content='Create Chat'>
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

						{isOpen && (
							<BreezeSideDrawer
								isOpen={isOpen}
								onClose={closeModal}
								children={<BreezeSideDrawerBody onClose={closeModal} />}
							/>
						)}
					</div>
				</div>
				<br />
				<div
					className='bg-white px-2 rounded-2xl'
					style={{
						maxHeight: "80vh",
					}}>
					<div
						className='my-2 rounded-2xl'
						style={{
							maxHeight: "78vh",
							minHeight: "78vh",
							overflowY: "scroll",
						}}>
						{isLoading ? (
							<BreezeTileSkeleton tileLength={7} />
						) : (
							chats?.map((item, index) => {
								return (
									<div key={`tile_item_${index}`}>
										<BreezeTile
											title={
												item?.isGroupChat
													? item?.chatName
													: CHAT_UTILS?.getOtherSideUserName(user, item?.users)
											}
											msg={item?.users?.[1]?.bio} // TODO:- FIXES BASED ON MSG || BIO
											isActive={true}
											isGrouped={item?.isGroupChat}
											profileImage={
												!item?.isGroupChat &&
												CHAT_UTILS?.getOtherSideProfileImage(user, item?.users)
											}
											isNotification={false}
										/>
										<hr
											style={{
												width: "95%",
												margin: "0 auto",
												borderTop: "1px solid var(--muted-color)",
											}}
										/>
									</div>
								);
							})
						)}
					</div>
				</div>
				<br />
			</div>
			<div className='sm:w-100% md:w-60% lg:w-70%'>
				<div className='flex justify-end items-center'>
					<BreezeDropdown
						listItems={profileDropdown}
						menuAction={(e, key) => {
							switch (key) {
								case profileMenuType.LOGOUT:
									onLogoutHandler();
									break;
								default:
									break;
							}
						}}
						isIcon={true}
						children={
							<BreezeTooltip id={"profileImage"}>
								<div
									data-tooltip-id='profileImage'
									data-tooltip-content={user?.name}>
									<BreezeAvatar
										profileImage={user?.profileImage}
										isGrouped={false}
										isActive={true}
										title={BreezeSessionManagement?.getUserSession()?.name}
									/>
								</div>
							</BreezeTooltip>
						}
					/>
				</div>
				<br />

				<div
					className='bg-background-color-light px-2 rounded-2xl'
					style={{
						minHeight: "80vh",
					}}>
					<div
						className='my-2'
						style={{
							maxHeight: "78vh",
							minHeight: "78vh",
							overflowY: "scroll",
						}}></div>
				</div>
				<br />
			</div>
		</div>
	);
};

export default ChatScreen;
