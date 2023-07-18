import { CHAT_UTILS } from "@/shared/utils/chat.utils";
import { useChatState } from "@Context/chatProvider";
import { MdBlock, MdReport, MdDelete, MdOutlineMessage } from "react-icons/md";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { useSelectUserFomGroupState } from "@Context/selectUserFromGroupProvider";
import BreezeProfileAvatar from "@Components/breezeProfileAvatar/breezeProfileAvatar.components";
const BreezeSelfProfile = ({ onClose, fetchAgain, setFetchAgain }) => {
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
					<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-5'>
						<BreezeProfileAvatar
							fetchAgain={fetchAgain}
							setFetchAgain={setFetchAgain}
							title={
								selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)
							}
							profileImage={
								selectedChat?.isGroupChat
									? selectedChat?.groupImage
									: CHAT_UTILS?.getOtherSideProfileImage(
											user,
											selectedChat?.users
									  )
							}
						/>

						{/* <div className='my-5 w-90%'>
							{isEditGroupName ? (
								<div className=' flex items-center justify-start gap-5'>
									<div className='w-90% '>
										<BreezeInputField
											type={InputType.EMAIL}
											name='editGroupName'
											register={register}
											errors={errors}
											validationSchema={{
												required: "Please enter the name",
											}}
											placeholder='Enter group name'
											required
										/>
									</div>
									<div
										className='cursor-pointer'
										onClick={handleSubmit(renameGroupNameHandler)}>
										<FiCheck
											style={{
												color: `var(--color-darkTeal)`,
												fontSize: `var(--fontsize-pearl)`,
											}}
										/>
									</div>
								</div>
							) : (
								<div className='flex items-center justify-center gap-5'>
									<div className='text-center uppercase  text-fontsize-pearl ease-out duration-300 hover:tracking-wider cursor-pointer '>
										{selectedChat?.isGroupChat
											? selectedChat?.chatName
											: CHAT_UTILS?.getOtherSideUserName(
													user,
													selectedChat?.users
											  )}
									</div>
									<div
										className='cursor-pointer'
										onClick={() => setEditGroupName(true)}>
										<FiEdit3
											style={{
												color: `var(--color-darkTeal)`,
												fontSize: `var(--fontsize-trim)`,
											}}
										/>
									</div>
								</div>
							)}

							<p className='mt-1 text-center text-slate-400 ease-out duration-300 hover:tracking-wider  cursor-pointer'>
								Group :{" "}
								{selectedChat?.isGroupChat && selectedChat?.users?.length}{" "}
								Members
							</p>
						</div> */}
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
							isProfileMode={true}
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

export default BreezeSelfProfile;
