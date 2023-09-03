import { useCallback, useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeSideDrawer from "@Components/breezeSidedrawer/breezeSidedrawer.components";
import BreezeSideDrawerBody from "@Components/breezeSidedrawer/breezeSidedrawerBody.components";
import { HTTPStatusCode } from "@Constants/network";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import ChatNotFound from "@Modules/misc/screens/chatNotFound.screen";
import BreezeModal from "@Components/breezeModal/breezeModal.components";
import BreezeGroupChat from "@Components/breezeGroupChat/breezeGroupChat.components";
import { ChatDAO } from "../core/chatDAO";
import BreezeChatBox from "@Components/breezeChatBox/breezeChatBox.components";
import { socket } from "@Socket/socket";
import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";
import useCombinedStore from "@Zustand/store/store";
import BreezeInDisplaySidebar from "@Components/breezeInDisplaySidebar/breezeInDisplaySidebar.components";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { ARRAY_METHODS, DATE_UTILS } from "@Shared/utils/basic.utils";
import { IoClose } from "react-icons/io5";

const ChatScreen = () => {
	const [isGroupChatModal, setGroupChatModal] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [fetchAgain, setFetchAgain] = useState(false);
	const [isSelectedChatProfile, setSelectedChatProfile] = useState(false);
	const [socketConnection, setSocketConnection] = useState(false);
	const [typing, setTyping] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [searchChat, setSearchChat] = useState([]);

	const {
		setUserDetails,
		clearUserFromGroup,
		chatList,
		clearChatList,
		setChatList,
		loggedInUser,
		isActive,
		selectedChat,
		setSelectedChat,
		notificationList,
		setNewMessages,
		newMessages,
		setNotification,
		hideProfile,
		onlineUsers,
		setOnlineUsers,
	} = useCombinedStore((state) => ({
		clearUserFromGroup: state?.clearUserFromGroup,
		chatList: state?.chatList,
		setChatList: state?.setChatList,
		clearChatList: state?.clearChatList,
		loggedInUser: state?.loggedInUser,
		isActive: state?.isActive,
		hideProfile: state?.hideProfile,
		setUserDetails: state?.setUserDetails,
		selectedChat: state?.selectedChat,
		setSelectedChat: state?.setSelectedChat,
		notificationList: state?.notificationList,
		setNotification: state?.setNotification,
		setNewMessages: state?.setNewMessages,
		newMessages: state?.newMessages,
		onlineUsers: state?.onlineUsers,
		setOnlineUsers: state?.setOnlineUsers,
	}));

	const { register } = useForm({});

	const [isSidebar, setSidebar] = useState(false);

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
		const response = await ChatDAO.fetchChatDAO(loggedInUser?.userId);
		if (response?.statusCode === HTTPStatusCode.OK) {
			setChatList(response?.responseBody);
		} else clearChatList();
		setLoading(false);
	}, [clearChatList, loggedInUser?.userId, setChatList]);

	useEffect(() => {
		onFetchChatHandler();
	}, [onFetchChatHandler]);

	useEffect(() => {
		const getUserDetails = BreezeSessionManagement.getUserSession();
		setUserDetails(getUserDetails);
	}, [setUserDetails]);
	useEffect(() => {
		socket.connect();
		socket.on("connected", (callback) => {
			callback();
			setSocketConnection(true);
		});
		socket.on("onlineUsers", (users) => {
			setOnlineUsers([...users]);
		});

		return () => {
			socket.disconnect();
			socket.off("connected");
			socket.off("onlineUsers");
		};
	}, [loggedInUser, setOnlineUsers]);

	useEffect(() => {
		socket.on("fetchChats", (chatByID) => {
			setChatList(chatByID);
		});
		return () => socket.off("fetchChats");
	}, [setChatList]);

	useEffect(() => {
		socket.on("recentChatList", (chatByID) => {
			setChatList(chatByID);
		});

		return () => socket.off("recentChatList");
	}, [setChatList]);

	useEffect(() => {
		const activeChat = chatList?.filter(
			(item) => item?._id === selectedChat?._id
		);
		setSelectedChat(activeChat?.[0]);
	}, [chatList, selectedChat?._id, setSelectedChat]);

	const unreadMessageCountHandler = useCallback(
		(item) => {
			const count = item?.unreadMessage?.filter((msg) => {
				return msg === loggedInUser?.userId;
			});
			return count?.length;
		},
		[loggedInUser]
	);

	const clearUnreadMessage = useCallback((item) => {}, []);

	const onChangeChatsHandler = useCallback(
		(item) => {
			// clearNotificationByID(item);
			hideProfile();
			clearUserFromGroup();
			setSelectedChat(item);

			socket.emit("joinChat", item?._id);
			socket.emit("checkUnreadMessage", {
				chatID: item?._id,
				loggedInID: loggedInUser?.userId,
			});
			// socket.emit("stopTyping", selectedChat?._id);
			// setTyping(false);
		},
		[clearUserFromGroup, hideProfile, loggedInUser?.userId, setSelectedChat]
	);

	/** -------- Chat Search Start --------------- */
	const onSearchChat = (e) => {
		let filteredData = chatList.filter((item) => {
			const name = item?.isGroupChat
				? item?.chatName
				: CHAT_UTILS?.getOtherSideUserName(loggedInUser, item?.users);
			return name?.toLowerCase()?.includes(e.target.value.toLowerCase());
		});
		setSearchChat([...filteredData]);
	};

	const searchedMemo = useMemo(
		() => (searchChat && searchChat?.length > 0 ? searchChat : chatList),
		[chatList, searchChat]
	);
	/** -------- Chat Search End --------------- */
	useEffect(() => {
		socket.on("getMessage", (newMsgRecieved) => {
			if (selectedChat?._id === newMsgRecieved?.chat?._id) {
				setNewMessages([...newMessages, newMsgRecieved]);
			}
		});

		return () => socket.off("getMessage");
	}, [newMessages, selectedChat?._id, setNewMessages]);

	useEffect(() => {
		socket.on("clearUnreadMessage", (unreadMessageResponse) => {
			clearUnreadMessage(unreadMessageResponse);
		});
	}, [clearUnreadMessage]);
	return (
		<div className='xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex items-start justify-start gap-0.5 h-screen'>
			<div className=' bg-white w-25% '>
				<header className='flex items-center  justify-between  truncate w-95% mx-auto my-5 '>
					<div className='text-fontsize-pearl font-bold'>Chats</div>
					<div
						className='group flex items-center justify-start gap-3 cursor-pointer bg-black px-3 py-3 rounded-xl'
						onClick={openSideBar}>
						<BsPlusLg
							style={{
								cursor: "pointer",
								color: `var(--background-color-light)`,
								fontSize: `var(--fontsize-glossy)`,
								fontWeight: 900,
							}}
						/>
						<p className='hidden group-hover:inline  group-hover:text-white text-sm '>
							Create chat
						</p>
					</div>
				</header>
				<div className='w-95% mx-auto mt-5 mb-8'>
					<BreezeSearch
						onChangeHandler={onSearchChat}
						placeholder={"Search chat"}
						leadingIcon={
							<BiSearch
								style={{
									color: `var(--background-color-dark)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						}
						isDismissible
						register={register}
						name='searchUser'
						// dismissibleIcon={
						// 	<span
						// 		onClick={()=>}
						// 		className=' hover:bg-gray-300 text-white font-bold p-2 rounded-full cursor-pointer'>
						// 		<IoClose
						// 			style={{
						// 				color: `var(--background-color-dark)`,
						// 				fontSize: `var(--fontsize-virgin)`,
						// 			}}
						// 		/>
						// 	</span>
						// }
					/>
				</div>
				<div className='w-95% mx-auto'>
					<BreezeDivider isDashed={true} />
				</div>

				<div className='w-100% mx-auto'>
					<div className='rounded-xl  items-start justify-between gap-5 m-auto'>
						<div
							className='bg-white rounded-xl overflow-y-auto '
							style={{
								height: "calc(100vh - 170px)",
								maxHeight: "calc(100vh - 170px)",
							}}>
							{isLoading ? (
								<BreezeTileSkeleton tileLength={7} />
							) : (
								<>
									{searchedMemo?.map((item, index) => {
										return (
											<div key={`tile_item_${index}`}>
												<BreezeTile
													tileID={selectedChat?._id}
													onClickHandler={() => onChangeChatsHandler(item)}
													title={
														item?.isGroupChat
															? item?.chatName
															: CHAT_UTILS?.getOtherSideUserName(
																	loggedInUser,
																	item?.users
															  )
													}
													lastMsgSender={item?.recentMessage?.sender?.name}
													lastMsgSenderID={item?.recentMessage?.sender?._id}
													bio={!item?.recentMessage && item?.users?.[1]?.bio} // TODO:- FIXES BASED ON MSG || BIO
													msg={
														item?.recentMessage?.content > 30
															? item?.recentMessage?.content?.substring(0, 30) +
															  "..."
															: item?.recentMessage?.content
													}
													isActive={ARRAY_METHODS.isElementExist(
														onlineUsers,
														CHAT_UTILS.getOtherSideUserID(
															loggedInUser,
															item?.users
														)
													)}
													lastMessageTime={
														item &&
														item?.recentMessage?.createdAt &&
														DATE_UTILS.getTimeInAMPM(
															item?.recentMessage?.createdAt
														)
													}
													isGrouped={item?.isGroupChat}
													profileImage={
														item?.isGroupChat
															? item?.groupImage
															: CHAT_UTILS?.getOtherSideProfileImage(
																	loggedInUser,
																	item?.users
															  )
													}
													isLastTimeActive={true}
													styleClass={`transition-all duration-300 ease-in-out rounded-2xl ${
														selectedChat === item
															? " py-5 bg-gray-100"
															: "bg-transparent"
													} w-95% mx-auto`}
													// isNotification={item?.unreadMessage?.length}
													unreadMessageCount={unreadMessageCountHandler(item)}
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

				{isSidebar && (
					<BreezeSideDrawer
						isOpen={isSidebar}
						onClose={closeSideBar}
						backgroundColor={"bg-white"}
						position='right-0'
						children={
							<BreezeSideDrawerBody
								onModalOpen={openGroupModal}
								onClose={closeSideBar}
								onModalClose={closeGroupModal}
							/>
						}
					/>
				)}
			</div>
			<div className={`${isActive ? "w-51%" : "flex-1"}`}>
				{!selectedChat ? (
					<ChatNotFound />
				) : (
					<BreezeChatBox
						typing={typing}
						isTyping={isTyping}
						setIsTyping={setIsTyping}
						setTyping={setTyping}
						setChats={setChatList}
						isSelectedChatProfile={isSelectedChatProfile}
						setSelectedChatProfile={setSelectedChatProfile}
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
					/>
				)}
			</div>

			{isActive && (
				<div className={`bg-white h-screen flex-1`}>
					<BreezeInDisplaySidebar
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
						isSelectedChatProfile={isSelectedChatProfile}
						setSelectedChatProfile={setSelectedChatProfile}
					/>
				</div>
			)}

			{isGroupChatModal && (
				<BreezeModal
					backgroundColor={"bg-white"}
					closeModal={closeGroupModal}
					isModalOpen={isGroupChatModal}
					key={"Group_chat_modal"}
					children={<BreezeGroupChat closeModal={closeGroupModal} />}
					isDismissible={true}
				/>
			)}
		</div>
	);
};

export default ChatScreen;
