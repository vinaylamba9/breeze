import { CHAT_UTILS } from "@/shared/utils/chat.utils";
import { useChatState } from "@Context/chatProvider";
import { MdBlock, MdReport, MdDelete, MdOutlineMessage } from "react-icons/md";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { useSelectUserFomGroupState } from "@Context/selectUserFromGroupProvider";
const BreezeProfile = ({ onClose }) => {
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
	const { selectUserFromGroup, setSelectUserFromGroup } =
		useSelectUserFomGroupState();
	return selectUserFromGroup ? (
		<>
			<div className=' text-fontsize-glossy font-medium pl-2 relative -mt-0.5 left-10 '>
				Contact info
			</div>
			<div
				style={{
					maxHeight: "100vh",
					minHeight: "100vh",
					overflowY: "scroll",
				}}>
				<div className='w-100% flex flex-col items-center justify-center my-6'>
					<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-3'>
						<BreezeAvatar
							title={
								selectUserFromGroup?.isGroupChat
									? selectUserFromGroup?.chatName
									: CHAT_UTILS?.getOtherSideUserName(
											user,
											selectUserFromGroup?.users
									  )
							}
							isActive={true}
							isGrouped={selectUserFromGroup?.isGroupChat}
							profileImage={
								!selectUserFromGroup?.isGroupChat &&
								CHAT_UTILS?.getOtherSideProfileImage(
									user,
									selectUserFromGroup?.users
								)
							}
							isForProfile={true}
							// onClickHandler={() => setSelectedChatProfile(true)}
						/>

						<div className='my-5'>
							<h1 className='text-center uppercase  ease-out duration-300 hover:tracking-wider cursor-pointer '>
								{selectUserFromGroup?.isGroupChat
									? selectUserFromGroup?.chatName
									: CHAT_UTILS?.getOtherSideUserName(
											user,
											selectUserFromGroup?.users
									  )}
							</h1>

							<p className='mt-1 text-color-darkTeal ease-out duration-300 hover:tracking-wider  cursor-pointer'>
								{!selectUserFromGroup?.isGroupChat &&
									CHAT_UTILS?.getOtherSideProfileEmail(
										user,
										selectUserFromGroup?.users
									)}
							</p>
							<div
								className='mt-5 items-center justify-center flex flex-col cursor-pointer'
								onClick={() => {
									setSelectedChat(selectUserFromGroup);
									onClose();
								}}>
								<p className='text-color-darkTeal'>Go to chat</p>
								<div>
									<MdOutlineMessage
										style={{
											color: `var(--color-darkTeal)`,
											fontSize: `var(--fontsize-trim)`,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='w-100% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl'>
					<div className=' w-90% py-3 mx-auto cursor-pointer'>
						<p className='text-fontsize-virgin tracking-wide'>About</p>
						<p className='text-color-darkTeal'>
							{selectUserFromGroup?.isGroupChat
								? selectUserFromGroup?.bio
								: CHAT_UTILS?.getOtherSideProfileBio(
										user,
										selectUserFromGroup?.users
								  )}
						</p>
					</div>
				</div>
				<div className='w-100% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl'>
					<div className='w-100% flex flex-col justify-center items-center  py-3'>
						<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
							<MdReport
								style={{
									color: `var(--danger-color)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
							<p className='text-danger-color text-fontsize-brittle'>
								Block{" "}
								{selectUserFromGroup?.isGroupChat
									? selectUserFromGroup?.chatName
									: CHAT_UTILS?.getOtherSideUserName(
											user,
											selectUserFromGroup?.users
									  )}
							</p>
						</div>
					</div>
					<hr />
					<div className=' w-100% flex flex-col justify-center items-center  py-3'>
						<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
							<MdBlock
								style={{
									color: `var(--danger-color)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
							<p className='text-danger-color text-fontsize-brittle'>
								Report{" "}
								{selectUserFromGroup?.isGroupChat
									? selectUserFromGroup?.chatName
									: CHAT_UTILS?.getOtherSideUserName(
											user,
											selectUserFromGroup?.users
									  )}
							</p>
						</div>
					</div>
					<hr />
					<div className=' w-100% flex flex-col justify-center items-center  py-3'>
						<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
							<MdDelete
								style={{
									color: `var(--danger-color)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
							<p className='text-danger-color text-fontsize-brittle'>
								Clear chat
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	) : (
		<>
			<div className=' text-fontsize-glossy font-medium pl-2 relative -mt-0.5 left-10 '>
				Contact info
			</div>
			<div
				style={{
					maxHeight: "100vh",
					minHeight: "100vh",
					overflowY: "scroll",
				}}>
				<div className='w-100% flex flex-col items-center justify-center my-6'>
					<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-3'>
						<BreezeAvatar
							title={
								selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)
							}
							isActive={true}
							isGrouped={selectedChat?.isGroupChat}
							profileImage={
								!selectedChat?.isGroupChat &&
								CHAT_UTILS?.getOtherSideProfileImage(user, selectedChat?.users)
							}
							isForProfile={true}
							// onClickHandler={() => setSelectedChatProfile(true)}
						/>

						<div className='my-5'>
							<h1 className='text-center uppercase  ease-out duration-300 hover:tracking-wider cursor-pointer '>
								{selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)}
							</h1>

							<p className='mt-1 text-color-darkTeal ease-out duration-300 hover:tracking-wider  cursor-pointer'>
								{!selectedChat?.isGroupChat &&
									CHAT_UTILS?.getOtherSideProfileEmail(
										user,
										selectedChat?.users
									)}
							</p>
						</div>
					</div>
				</div>
				<div className='w-100% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl'>
					<div className=' w-90% py-3 mx-auto cursor-pointer'>
						<p className='text-fontsize-virgin tracking-wide'>About</p>
						<p className='text-color-darkTeal'>
							{selectedChat?.isGroupChat
								? selectedChat?.bio
								: CHAT_UTILS?.getOtherSideProfileBio(user, selectedChat?.users)}
						</p>
					</div>
				</div>
				<div className='w-100% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl'>
					<div className='w-100% flex flex-col justify-center items-center  py-3'>
						<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
							<MdReport
								style={{
									color: `var(--danger-color)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
							<p className='text-danger-color text-fontsize-brittle'>
								Block{" "}
								{selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)}
							</p>
						</div>
					</div>
					<hr />
					<div className=' w-100% flex flex-col justify-center items-center  py-3'>
						<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
							<MdBlock
								style={{
									color: `var(--danger-color)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
							<p className='text-danger-color text-fontsize-brittle'>
								Report{" "}
								{selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)}
							</p>
						</div>
					</div>
					<hr />
					<div className=' w-100% flex flex-col justify-center items-center  py-3'>
						<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
							<MdDelete
								style={{
									color: `var(--danger-color)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
							<p className='text-danger-color text-fontsize-brittle'>
								Clear chat
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BreezeProfile;
