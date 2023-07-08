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

const ChatScreen = () => {
	const navigate = useNavigate();
	const [isGroupChatModal, setGroupChatModal] = useState(false);
	const [isLoading, setLoading] = useState(false);
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
	}, [onFetchChatHandler]);

	return (
		<div className='mt-5'>
			<div className='xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex items-center justify-between  py-2'>
				<div className='xs:w-80% sm:w-80% md:w-70% lg:w-50% xl:w-30% flex items-center justify-between '>
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
					<BreezeTooltip id={"createChat"}>
						<button
							onClick={openSideBar}
							title='Create Chat'
							className='
									cursor-pointer
									bg-color-darkTeal
									w-10 h-10
									outline-none
									rounded-full 
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
					</BreezeTooltip>
					{isSidebar && (
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
					)}
				</div>
				<div className='xs:w-20% sm:w-20% md:w-30% lg:w-50% xl:w-70% '>
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
											title={user?.name}
										/>
									</div>
								</BreezeTooltip>
							}
						/>
					</div>
				</div>
			</div>
			{chats?.length === 0 ? (
				<ChatNotFound />
			) : (
				<div className='xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex items-center justify-between  gap-2 py-2'>
					<div className='xs:w-100% sm:w-100% md:w-30% lg:w-30% xl:w-30% '>
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
															: CHAT_UTILS?.getOtherSideUserName(
																	user,
																	item?.users
															  )
													}
													msg={item?.users?.[1]?.bio} // TODO:- FIXES BASED ON MSG || BIO
													isActive={true}
													isGrouped={item?.isGroupChat}
													profileImage={
														!item?.isGroupChat &&
														CHAT_UTILS?.getOtherSideProfileImage(
															user,
															item?.users
														)
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
					</div>
					<div
						className='xs:hidden sm:hidden md:w-70% lg:w-70% xl:w-70% bg-background-color-light px-2 rounded-2xl'
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
				</div>
			)}
			{isGroupChatModal && (
				<BreezeModal
					backgroundColor={"bg-white"}
					// width={"w-70%"}
					closeModal={closeGroupModal}
					isModalOpen={isGroupChatModal}
					key={"Group_chat_modal"}
					children={<BreezeGroupChat userList={userList} />}
					isDismissible={true}
				/>
			)}
		</div>
	);
};

export default ChatScreen;
