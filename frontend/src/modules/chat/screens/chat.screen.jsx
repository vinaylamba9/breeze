import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import { useChatState } from "@Context/chatProvider";
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
import BreezeDivider from "@/components/breezeDivider/breezeDivider.components";
import useCombinedStore from "@Zustand/store/store";
import BreezeInDisplaySidebar from "@Components/breezeInDisplaySidebar/breezeInDisplaySidebar.components";
import SelectUserFromGroupProvider from "@Context/selectUserFromGroupProvider";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
const ChatScreen = () => {
	const [isGroupChatModal, setGroupChatModal] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [fetchAgain, setFetchAgain] = useState(false);
	const [isSelectedChatProfile, setSelectedChatProfile] = useState(false);
	const { selectedChat, setSelectedChat, chats, setChats } = useChatState();
	// const [recentMessage, setRecentMessage] = useState(null);
	const { setUserDetails, loggedInUser, isActive, hideProfile } =
		useCombinedStore((state) => ({
			loggedInUser: state?.loggedInUser,
			isActive: state?.isActive,
			hideProfile: state?.hideProfile,
			setUserDetails: state?.setUserDetails,
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
		const response = await ChatDAO.fetchChatDAO(loggedInUser?._id);
		if (response?.statusCode === HTTPStatusCode.OK)
			setChats(response?.responseBody);
		else setChats([]);
		setLoading(false);
	}, [setChats, loggedInUser?._id]);

	useEffect(() => {
		onFetchChatHandler();
	}, [onFetchChatHandler, fetchAgain]);

	useEffect(() => {
		const getUserDetails = BreezeSessionManagement.getUserSession();
		setUserDetails(getUserDetails);
	}, [setUserDetails]);
	useEffect(() => {
		socket.connect();
		socket.emit("bootstrapSocket", loggedInUser);
		socket.on("connected", () => {
			console.log("user connected");
		});
		// socket.on("connected", () => setSocketConnection(true));
		// socket.on("typing", (room) => setIsTyping(true));
		// socket.on("stopTyping", (room) => setIsTyping(false));

		return () => {
			socket.disconnect();
		};
	}, [loggedInUser]);
	return (
		<div className='xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex items-start justify-start gap-0.5 h-screen'>
			<div className=' bg-white w-25% '>
				<header className='flex items-center  justify-between  truncate w-95% mx-auto my-5 '>
					<p className='text-fontsize-pearl font-bold'>Chats</p>
					<div
						className='flex items-center justify-start gap-3 cursor-pointer bg-black px-3 py-3 rounded-xl'
						onClick={openSideBar}>
						<BsPlusLg
							style={{
								cursor: "pointer",
								color: `var(--background-color-light)`,
								fontSize: `var(--fontsize-glossy)`,
								fontWeight: 900,
							}}
						/>
						<p className='text-white -mt-0.5'>Create chat</p>
					</div>
				</header>
				<div className='w-95% mx-auto mt-5 mb-8'>
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
									{chats?.map((item, index) => {
										return (
											<div key={`tile_item_${index}`}>
												<BreezeTile
													tileID={selectedChat?._id}
													onClickHandler={() => {
														hideProfile();
														setSelectedChat(item);
														socket.emit("leaveChat", selectedChat?._id);
													}}
													title={
														item?.isGroupChat
															? item?.chatName
															: CHAT_UTILS?.getOtherSideUserName(
																	loggedInUser,
																	item?.users
															  )
													}
													lastMsgSender={item?.recentMessage?.sender?.name}
													bio={!item?.recentMessage && item?.users?.[1]?.bio} // TODO:- FIXES BASED ON MSG || BIO
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
																	loggedInUser,
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

				{isSidebar && (
					<SelectUserFromGroupProvider>
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
					</SelectUserFromGroupProvider>
				)}
			</div>
			<div className={`${isActive ? "w-51%" : "flex-1"}`}>
				{!selectedChat ? (
					<ChatNotFound />
				) : (
					<BreezeChatBox
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
