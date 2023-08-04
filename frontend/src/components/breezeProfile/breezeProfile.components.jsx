import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import { useChatState } from "@Context/chatProvider";
import { MdBlock, MdReport, MdDelete } from "react-icons/md";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { useSelectUserFomGroupState } from "@Context/selectUserFromGroupProvider";
import useCombinedStore from "@Zustand/store/store";
import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";
import { useMemo } from "react";

const BreezeProfile = ({ onClose }) => {
	const { selectUserFromGroup, setSelectUserFromGroup } =
		useSelectUserFomGroupState();
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
	const { hideActive, showActive } = useCombinedStore((state) => ({
		hideActive: state?.hideActive,
		showActive: state?.showActive,
	}));

	const getProfileNameMemo = useMemo(
		() =>
			selectUserFromGroup?.isGroupChat
				? selectUserFromGroup?.chatName
				: CHAT_UTILS?.getOtherSideUserName(user, selectUserFromGroup?.users),
		[
			selectUserFromGroup?.chatName,
			selectUserFromGroup?.isGroupChat,
			selectUserFromGroup?.users,
			user,
		]
	);

	return selectUserFromGroup ? (
		<div
			style={{
				maxHeight: "100vh",
				minHeight: "100vh",
			}}>
			<div className=' bg-white drop-shadow-md py-3.5 rounded-bl rounded-br'>
				<div className='flex items-center gap-3 justify-start w-95% mx-auto'>
					<div
						className='p-3 hover:rounded-full hover:bg-gray-200 cursor-pointer ease-in-out duration-300 '
						onClick={() => setSelectUserFromGroup(null)}>
						<IoArrowBack
							style={{
								color: `var(--background-color-black)`,
								fontSize: `var(--fontsize-trim)`,
							}}
						/>
					</div>
					<div className=' flex-1 truncate text-fontsize-trim font-medium'>
						Contact &nbsp;info
					</div>
				</div>
			</div>
			<div
				className='overflow-y-auto '
				style={{
					minHeight: "calc(100vh - 76px)",
					maxHeight: "calc(100vh - 76px)",
				}}>
				<div className='w-95% flex flex-col items-center justify-center my-6'>
					<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-5'>
						<BreezeAvatar
							isProfileMode={true}
							title={getProfileNameMemo}
							isActive={true}
							isGrouped={selectUserFromGroup?.isGroupChat}
							profileImage={
								!selectUserFromGroup?.isGroupChat &&
								CHAT_UTILS?.getOtherSideProfileImage(
									user,
									selectUserFromGroup?.users
								)
							}

							// onClickHandler={() => setSelectedChatProfile(true)}
						/>
						<div className='mt-5'>
							<h1 className='text-center uppercase font-semibold ease-out duration-300 hover:tracking-wider cursor-pointer '>
								{selectUserFromGroup?.isGroupChat
									? selectUserFromGroup?.chatName
									: CHAT_UTILS?.getOtherSideUserName(
											user,
											selectUserFromGroup?.users
									  )}
							</h1>

							<p className='mt-1 text-color-darkTeal text-gray-700 ease-out duration-300 hover:tracking-wider  cursor-pointer'>
								{!selectUserFromGroup?.isGroupChat &&
									CHAT_UTILS?.getOtherSideProfileEmail(
										user,
										selectUserFromGroup?.users
									)}
							</p>
							<div
								className='mt-5 items-center justify-center flex  cursor-pointer'
								onClick={() => {
									hideActive();
									setSelectedChat(selectUserFromGroup);
									onClose();
								}}>
								<p className='text-gray-700 hover:mr-1 font-medium ease-in-out duration-300'>
									Go to chat
								</p>
								<div className='p-2 hover:ml-1  hover:rounded-full hover:bg-gray-200 cursor-pointer ease-in-out duration-300 '>
									<IoArrowForward
										style={{
											color: `var(--background-color-black)`,
											fontSize: `var(--fontsize-trim)`,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<BreezeDivider isDashed={true} />
				<div className='w-95% flex flex-col items-center justify-center mb-6 rounded-2xl'>
					<div className=' w-90% py-3 mx-auto cursor-pointer'>
						<p className='text-fontsize-virgin tracking-wide text-gray-900 font-medium'>
							About
						</p>
						<p className='text-gray-700 mt-1'>
							{selectUserFromGroup?.isGroupChat
								? selectUserFromGroup?.bio
								: CHAT_UTILS?.getOtherSideProfileBio(
										user,
										selectUserFromGroup?.users
								  )}
						</p>
					</div>
				</div>
				<BreezeDivider isDashed={true} />
				<div className='w-95% flex flex-col items-center justify-center mb-6  rounded-2xl'>
					<div className='w-100% mx-auto flex flex-col items-center justify-center mb-6 rounded-2xl'>
						<div className='w-100%  flex flex-col justify-start items-center  py-3'>
							<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
								<MdReport
									style={{
										color: `var(--danger-color)`,
										fontSize: `var(--fontsize-virgin)`,
									}}
								/>
								<p className='text-danger-color text-md'>
									Block &nbsp;
									{getProfileNameMemo}
								</p>
							</div>
						</div>
						<hr />
						<div className=' w-100% flex flex-col justify-center items-center  py-3'>
							<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
								<MdBlock
									style={{
										color: `var(--danger-color)`,
										fontSize: `var(--fontsize-virgin)`,
									}}
								/>
								<p className='text-danger-color text-md'>
									Report &nbsp;
									{getProfileNameMemo}
								</p>
							</div>
						</div>
						<hr />
						<div className=' w-100% flex flex-col justify-center items-center  py-3'>
							<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
								<MdDelete
									style={{
										color: `var(--danger-color)`,
										fontSize: `var(--fontsize-virgin)`,
									}}
								/>

								<p className='text-danger-color text-md'>Clear &nbsp;chat</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div
			style={{
				maxHeight: "100vh",
				minHeight: "100vh",
			}}>
			<div className=' bg-white drop-shadow-md py-3.5 rounded-bl rounded-br'>
				<div className='flex items-center gap-3 justify-start w-95% mx-auto'>
					<div
						className='p-3 hover:rounded-full hover:bg-gray-200 cursor-pointer ease-in-out duration-300 '
						onClick={hideActive}>
						<IoArrowForward
							style={{
								color: `var(--background-color-black)`,
								fontSize: `var(--fontsize-trim)`,
							}}
						/>
					</div>
					<div className=' flex-1 truncate text-fontsize-glossy font-medium'>
						Contact &nbsp;info
					</div>
				</div>
			</div>
			<div
				className='overflow-y-auto '
				style={{
					minHeight: "calc(100vh - 76px)",
					maxHeight: "calc(100vh - 76px)",
				}}>
				<div className='w-95% mx-auto flex flex-col items-center justify-center my-6'>
					<div className='w-100% flex flex-col justify-center items-center rounded-2xl py-5'>
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

						<div className='mt-5'>
							<h1 className='text-center uppercase font-semibold	 ease-out duration-300 hover:tracking-wider cursor-pointer '>
								{selectedChat?.isGroupChat
									? selectedChat?.chatName
									: CHAT_UTILS?.getOtherSideUserName(user, selectedChat?.users)}
							</h1>

							<p className='mt-1 text-gray-700 ease-out duration-300 hover:tracking-wider  cursor-pointer'>
								{!selectedChat?.isGroupChat &&
									CHAT_UTILS?.getOtherSideProfileEmail(
										user,
										selectedChat?.users
									)}
							</p>
						</div>
					</div>
				</div>
				<BreezeDivider isDashed={true} />
				<div className='w-95% mx-auto flex flex-col items-center justify-center mb-6  rounded-2xl'>
					<div className=' w-90% py-3 mx-auto cursor-pointer'>
						<p className='text-fontsize-virgin text-gray-900 tracking-wide font-medium'>
							About
						</p>
						<p className='text-gray-700 mt-1'>
							{selectedChat?.isGroupChat
								? selectedChat?.bio
								: CHAT_UTILS?.getOtherSideProfileBio(user, selectedChat?.users)}
						</p>
					</div>
				</div>
				<BreezeDivider isDashed={true} />
				<div className='w-95% mx-auto flex flex-col items-center justify-center mb-6 rounded-2xl'>
					<div className='w-100%  flex flex-col justify-start items-center  py-3'>
						<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
							<MdReport
								style={{
									color: `var(--danger-color)`,
									fontSize: `var(--fontsize-virgin)`,
								}}
							/>
							<p className='text-danger-color text-md'>
								Block &nbsp;
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
									fontSize: `var(--fontsize-virgin)`,
								}}
							/>
							<p className='text-danger-color text-md'>
								Report &nbsp;
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
									fontSize: `var(--fontsize-virgin)`,
								}}
							/>

							<p className='text-danger-color text-md'>Clear &nbsp;chat</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BreezeProfile;
