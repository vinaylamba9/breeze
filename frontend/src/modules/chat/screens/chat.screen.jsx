import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import { useChatState } from "@Context/chatProvider";
import BreezeDropdown from "@Components/breezeDropdown/breezeDropdown.components";
import { profileDropdown, profileMenuType } from "@Constants/application";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import BreezeRoutes from "@Constants/routes";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeSideDrawerBody from "@Components/breezeSidedrawer/breezeSidedrawerBody.components";
import { HTTPStatusCode } from "@Constants/network";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import ChatNotFound from "@Modules/misc/screens/chatNotFound.screen";
import BreezeModal from "@Components/breezeModal/breezeModal.components";
import BreezeGroupChat from "@Components/breezeGroupChat/breezeGroupChat.components";
import { ChatDAO } from "../core/chatDAO";
import BreezeLoader from "@Components/breezeLoader/breezeLoader.components";
import BreezeChatBox from "@Components/breezeChatBox/breezeChatBox.components";
import SelectUserFromGroupProvider from "@Context/selectUserFromGroupProvider";
import BreezeSelfProfile from "@Components/breezeSelfProfile/breezeSelfProfile.components";
import { socket } from "@Socket/socket";
import BreezeDivider from "@/components/breezeDivider/breezeDivider.components";
import classNames from "classnames";

const ChatScreen = () => {
	const navigate = useNavigate();
	const [isGroupChatModal, setGroupChatModal] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [fetchAgain, setFetchAgain] = useState(false);

	const {
		user,
		setUser,
		selectedChat,
		setSelectedChat,
		chats,
		setChats,
		userList,
		setUserList,
	} = useChatState();

	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	const [isSidebar, setSidebar] = useState(false);
	const [isProfile, setProfile] = useState(false);

	const openSideBar = () => {
		setSidebar(true);
	};

	const closeSideBar = () => {
		setSidebar(false);
	};

	const openGroupModal = () => {
		setGroupChatModal(true);
		setSidebar(false);
	};
	const closeGroupModal = () => {
		setGroupChatModal(false);
	};

	const onFetchChatHandler = useCallback(async () => {
		setLoading(true);
		const response = await ChatDAO.fetchChatDAO(user?._id);
		if (response?.statusCode === HTTPStatusCode.OK)
			setChats(response?.responseBody);
		else setChats([]);
		setLoading(false);
	}, [setChats, user?._id]);

	const onLogoutHandler = useCallback(() => {
		const res = userDAO.logoutDAO();
		if (res) navigate(BreezeRoutes.LOGINROUTE);
	}, [navigate]);

	useEffect(() => {
		onFetchChatHandler();
	}, [onFetchChatHandler, fetchAgain]);

	return (
		<div className='xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex items-start justify-start gap-0.5 h-screen'>
			<div className='h-screen bg-white w-25% '>
				<header className='drop-shadow-md truncate w-95% mx-auto my-5 text-fontsize-pearl font-bold'>
					Chats
				</header>
				<div className='w-95% mx-auto my-5'>
					<BreezeSearch
						placeholder={"Search chat"}
						leadingIcon={
							<BiSearch
								style={{
									color: `var(--background-color-dark)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						}
						register={register}
						name='searchUser'
					/>
				</div>
				<div className='w-95% mx-auto'>
					<BreezeDivider isDashed={true} />
				</div>

				<div className='w-100% mx-auto'>
					<div className='rounded-xl  items-start justify-between gap-5  m-auto'>
						<div
							className='bg-white rounded-xl overflow-y-auto '
							style={{ height: "calc(100vh - 155px)" }}>
							{isLoading ? (
								<BreezeTileSkeleton tileLength={7} />
							) : (
								<>
									{chats?.map((item, index) => {
										return (
											<div key={`tile_item_${index}`}>
												<BreezeTile
													tileID={selectedChat?._id}
													onClickHandler={() => {
														setSelectedChat(item);
														socket.emit("leaveChat", selectedChat?._id);
													}}
													title={
														item?.isGroupChat
															? item?.chatName
															: CHAT_UTILS?.getOtherSideUserName(
																	user,
																	item?.users
															  )
													}
													lastMsgSender={item?.recentMessage?.sender?.name}
													// msg={item?.users?.[1]?.bio} // TODO:- FIXES BASED ON MSG || BIO
													msg={
														item?.recentMessage?.content > 30
															? item?.recentMessage?.content?.substring(0, 30) +
															  "..."
															: item?.recentMessage?.content
													}
													isActive={true}
													isGrouped={item?.isGroupChat}
													profileImage={
														item?.isGroupChat
															? item?.groupImage
															: CHAT_UTILS?.getOtherSideProfileImage(
																	user,
																	item?.users
															  )
													}
													styleClass={`transition-all duration-300 ease-in-out rounded-2xl ${
														selectedChat === item
															? " py-5 bg-gray-100"
															: "bg-transparent"
													} w-95% mx-auto`}
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
									})}
								</>
							)}
						</div>
					</div>
				</div>
				{/* <BreezeTooltip id={"createChat"}>
					<button
						onClick={openSideBar}
						title='Create Chat'
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
				</BreezeTooltip> */}
				{/* {isSidebar && (
					<SelectUserFromGroupProvider>
						<BreezeSideDrawer
							isOpen={isSidebar}
							onClose={closeSideBar}
							children={
								<BreezeSideDrawerBody
									onModalOpen={openGroupModal}
									onClose={closeSideBar}
									onModalClose={closeGroupModal}
								/>
							}
						/>
					</SelectUserFromGroupProvider>
				)} */}
			</div>
			<div
				className='flex-1 bg-white overflow-y-auto xs:hidden sm:hidden md:w-70% lg:w-70% xl:w-70% '
				style={{ height: "calc(100vh)" }}>
				{!selectedChat ? (
					<ChatNotFound />
				) : (
					<BreezeChatBox
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
					/>
				)}
			</div>
			{/* <div className='xs:w-20% sm:w-20% md:w-30% lg:w-50% xl:w-70% '>
					<div className='flex justify-end items-center'>
						<BreezeDropdown
							listItems={profileDropdown}
							menuAction={(e, key) => {
								switch (key) {
									case profileMenuType.LOGOUT:
										onLogoutHandler();
										break;
									case profileMenuType.PROFILE:
										setProfile(true);
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
											title={user?.name}
										/>
									</div>
								</BreezeTooltip>
							}
						/>
					</div>
				</div> */}

			{isGroupChatModal && (
				<BreezeModal
					backgroundColor={"bg-color-slate"}
					closeModal={closeGroupModal}
					isModalOpen={isGroupChatModal}
					key={"Group_chat_modal"}
					children={<BreezeGroupChat closeModal={closeGroupModal} />}
					isDismissible={true}
				/>
			)}
			{isProfile && (
				<SelectUserFromGroupProvider>
					<BreezeSideDrawer
						backgroundColor='bg-color-slate'
						isOpen={isProfile}
						onClose={() => setProfile(false)}
						position='right-0'
						children={
							<BreezeSelfProfile
								fetchAgain={fetchAgain}
								setFetchAgain={setFetchAgain}
								onClose={() => setProfile(false)}
							/>
						}
					/>
				</SelectUserFromGroupProvider>
			)}
		</div>
	);
};

export default ChatScreen;
