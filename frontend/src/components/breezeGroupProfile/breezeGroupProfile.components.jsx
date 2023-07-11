import { CHAT_UTILS } from "@/shared/utils/chat.utils";
import { useChatState } from "@Context/chatProvider";
import { MdBlock, MdReport, MdDelete } from "react-icons/md";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import { useSelectUserFomGroupState } from "@Context/selectUserFromGroupProvider";

const BreezeGroupProfile = () => {
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
	const onFilterUserFromGroup = (item) => {
		const response = chats?.filter(
			(chat) =>
				!chat?.isGroupChat &&
				(chat?.users?.[0]?._id === item?._id ||
					chat?.users?.[1]?._id === item?._id)
		);
		setSelectUserFromGroup(response?.[0]);
	};

	return (
		<div>
			{selectUserFromGroup ? (
				<BreezeProfile />
			) : (
				<>
					<div className=' text-fontsize-glossy font-medium pl-2 relative -mt-0.5 left-10 '>
						Group info
					</div>
					<div
						style={{
							maxHeight: "95vh",
							overflowY: "scroll",
						}}>
						<div className='w-100% flex flex-col items-center justify-center mt-5 '>
							<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-3'>
								<BreezeAvatar
									title={
										selectedChat?.isGroupChat
											? selectedChat?.chatName
											: CHAT_UTILS?.getOtherSideUserName(
													user,
													selectedChat?.users
											  )
									}
									isActive={true}
									isGrouped={selectedChat?.isGroupChat}
									profileImage={
										!selectedChat?.isGroupChat &&
										CHAT_UTILS?.getOtherSideProfileImage(
											user,
											selectedChat?.users
										)
									}
									isForProfile={true}
								/>

								<div className='my-5'>
									<h1 className='text-center uppercase  ease-out duration-300 hover:tracking-wider cursor-pointer '>
										{selectedChat?.isGroupChat
											? selectedChat?.chatName
											: CHAT_UTILS?.getOtherSideUserName(
													user,
													selectedChat?.users
											  )}
									</h1>

									<p className='mt-1 text-slate-400 ease-out duration-300 hover:tracking-wider  cursor-pointer'>
										Group :{" "}
										{selectedChat?.isGroupChat && selectedChat?.users?.length}{" "}
										Members
									</p>
								</div>
							</div>
						</div>
						<div className='w-100% flex flex-col items-center justify-center my-6 bg-white rounded-2xl'>
							<div className=' w-90% py-3 mx-auto cursor-pointer'>
								<p className='text-fontsize-virgin tracking-wide'>About</p>
								<p className='text-color-darkTeal'>
									{selectedChat?.isGroupChat
										? selectedChat?.bio
										: CHAT_UTILS?.getOtherSideProfileBio(
												user,
												selectedChat?.users
										  )}
								</p>
							</div>
						</div>
						<div className='w-100% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl'>
							<div className=' w-90% py-3 mx-auto cursor-pointer'>
								<p className='text-color-darkTeal'>
									{selectedChat?.users?.length} Members
								</p>
							</div>
							<div className='w-100%'>
								<div
									className='bg-white px-2 rounded-2xl'
									style={{
										maxHeight: "50vh",
									}}>
									<div
										className='my-2 rounded-2xl'
										style={{
											maxHeight: "50vh",
											overflowY: "scroll",
										}}>
										{selectedChat?.users?.map((item, index) => {
											return (
												<div key={`tile_item_${index}`}>
													<BreezeTile
														onClickHandler={() => onFilterUserFromGroup(item)}
														title={item?.name}
														msg={item?.bio} // TODO:- FIXES BASED ON MSG || BIO
														isActive={true}
														isGrouped={item?.isGroupChat}
														profileImage={item?.profileImage}
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
									</div>
								</div>
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
											: CHAT_UTILS?.getOtherSideUserName(
													user,
													selectedChat?.users
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
										{selectedChat?.isGroupChat
											? selectedChat?.chatName
											: CHAT_UTILS?.getOtherSideUserName(
													user,
													selectedChat?.users
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
			)}
		</div>
	);
};

export default BreezeGroupProfile;
