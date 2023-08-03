import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosExit } from "react-icons/io";
import { MdReportProblem } from "react-icons/md";
import { FiEdit3, FiCheck } from "react-icons/fi";
import { BsPlusLg } from "react-icons/bs";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import { useChatState } from "@Context/chatProvider";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import { useSelectUserFomGroupState } from "@Context/selectUserFromGroupProvider";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import { InputType } from "@Constants/application";
import { ChatDAO } from "@Modules/chat/core/chatDAO";
import { HTTPStatusCode } from "@Constants/network";
import BreezeModal from "@Components/breezeModal/breezeModal.components";
import StepperTwo from "@Components/breezeStepper/stepperTwo";
import CreateGroupProvider from "@Context/createGroupProvider";
import BreezeProfileAvatar from "@Components/breezeProfileAvatar/breezeProfileAvatar.components";

const BreezeGroupProfile = ({
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
	onClose,
}) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		setValue,
		formState: { errors },
	} = useForm({});

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

	const [isEditGroupName, setEditGroupName] = useState(false);
	const [isEditGroupBio, setEditGroupBio] = useState(false);
	const [addMembersModal, setAddMembersModal] = useState(false);
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
	const renameGroupNameHandler = useCallback(
		async (d) => {
			if (d?.editGroupName !== selectedChat?.chatName) {
				const response = await ChatDAO.renameGroupChatDAO({
					chatID: selectedChat?._id,
					chatName: d?.editGroupName,
				});
				if (response?.statusCode === HTTPStatusCode.OK) {
					isEditGroupName && setEditGroupName(false);
					setSelectedChat(response?.responseData);
					setFetchAgain(!fetchAgain);
				}
			} else {
				setEditGroupName(false);
			}
		},
		[
			selectedChat?.chatName,
			selectedChat?._id,
			isEditGroupName,
			setSelectedChat,
			setFetchAgain,
			fetchAgain,
		]
	);
	const renameGroupBioHandler = useCallback(
		async (d) => {
			if (d?.editGroupBio !== selectedChat?.bio) {
				const response = await ChatDAO.renameGroupChatBioDAO({
					chatID: selectedChat?._id,
					bio: d?.editGroupBio,
				});
				if (response?.statusCode === HTTPStatusCode.OK) {
					isEditGroupBio && setEditGroupBio(false);
					setSelectedChat(response?.responseData);
					setFetchAgain(!fetchAgain);
				}
			} else {
				setEditGroupBio(false);
			}
		},
		[
			selectedChat?.bio,
			selectedChat?._id,
			isEditGroupBio,
			setSelectedChat,
			setFetchAgain,
			fetchAgain,
		]
	);
	const leaveGroupHandler = useCallback(async () => {
		const response = await ChatDAO.removeUserFromGroupDAO({
			chatID: selectedChat?._id,
			userID: user?.userId,
		});
		if (response?.statusCode === HTTPStatusCode.OK) setSelectedChat();
		setFetchAgain(!fetchAgain);
	}, [
		fetchAgain,
		selectedChat?._id,
		setFetchAgain,
		setSelectedChat,
		user?.userId,
	]);

	useEffect(() => {
		setValue("editGroupName", selectedChat?.chatName);
		setValue("editGroupBio", selectedChat?.bio);
	}, [setValue, selectedChat?.chatName, selectedChat?.bio]);
	return (
		<div
			className='w-95% border border-red-700  mx-auto'
			style={{
				maxHeight: "100vh",
				minHeight: "100vh",
				overflowY: "scroll",
			}}>
			{selectUserFromGroup ? (
				<BreezeProfile onClose={() => setSelectedChatProfile(false)} />
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
							<div className='bg-white w-100% flex flex-col justify-center items-center rounded-2xl py-5'>
								<BreezeProfileAvatar
									setSelectedChatProfile={setSelectedChatProfile}
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
									title={
										selectedChat?.isGroupChat
											? selectedChat?.chatName
											: CHAT_UTILS?.getOtherSideUserName(
													user,
													selectedChat?.users
											  )
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

								<div className='my-5 w-90%'>
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
								</div>
							</div>
						</div>
						<div className='w-100% flex items-start justify-center my-6 bg-white rounded-2xl'>
							{isEditGroupBio ? (
								<div className=' w-100% '>
									<div className='w-100% mx-auto  p-3'>
										<p className='text-fontsize-virgin tracking-wide px-3'>
											About
										</p>
										<BreezeInputField
											type={InputType.TEXT}
											name='editGroupBio'
											register={register}
											errors={errors}
											validationSchema={{
												required: "Please enter the bio",
											}}
											placeholder='Enter bio'
											required
										/>
									</div>
								</div>
							) : (
								<div className='flex flex-col items-start justify-start  w-80% py-3 mx-auto cursor-pointer'>
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
							)}
							{isEditGroupBio ? (
								<div
									className='cursor-pointer pt-3 pr-5'
									onClick={handleSubmit(renameGroupBioHandler)}>
									<FiCheck
										style={{
											color: `var(--color-darkTeal)`,
											fontSize: `var(--fontsize-pearl)`,
										}}
									/>
								</div>
							) : (
								<div
									className='cursor-pointer pt-3 pr-5'
									onClick={() => setEditGroupBio(true)}>
									<FiEdit3
										style={{
											color: `var(--color-darkTeal)`,
											fontSize: `var(--fontsize-trim)`,
										}}
									/>
								</div>
							)}
						</div>
						<div className='w-100% flex flex-col items-center justify-center mb-6 bg-white rounded-2xl'>
							<div className=' w-90% py-3 mx-auto cursor-pointer flex justify-between items-center'>
								<p className='text-color-darkTeal text-lg'>
									{selectedChat?.users?.length} Members
								</p>
								{selectedChat?.groupAdmin?._id === user?.userId && (
									<div
										className=' bg-color-cyan shadow-md rounded-md px-5 py-2.5 flex items-center justify-start gap-2'
										onClick={() => setAddMembersModal(true)}>
										<span>
											<BsPlusLg
												style={{
													cursor: "pointer",
													color: `var(--background-color-light)`,
													fontSize: `var(--fontsize-trim)`,
													fontWeight: 900,
												}}
											/>
										</span>
										<span className='text-white'>Add Members</span>
									</div>
								)}
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
														onClickHandler={
															user?.userId !== item?._id
																? () => onFilterUserFromGroup(item)
																: null
														}
														title={item?.name}
														msg={item?.bio} // TODO:- FIXES BASED ON MSG || BIO
														isGrouped={item?.isGroupChat}
														profileImage={item?.profileImage}
														isNotification={false}
														isAdmin={
															selectedChat?.groupAdmin?._id === item?._id
														}
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
							<div className=' w-100% flex flex-col justify-center items-center  py-3'>
								<div
									className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'
									onClick={leaveGroupHandler}>
									<IoIosExit
										style={{
											color: `var(--danger-color)`,
											fontSize: `var(--fontsize-trim)`,
										}}
									/>
									<p className='text-danger-color text-fontsize-brittle'>
										Exit Group
									</p>
								</div>
							</div>
							<hr />
							<div className=' w-100% flex flex-col justify-center items-center  py-3'>
								<div className='w-90% mx-auto flex justify-start items-center gap-5 cursor-pointer ease-out duration-300 hover:tracking-wider'>
									<MdReportProblem
										style={{
											color: `var(--danger-color)`,
											fontSize: `var(--fontsize-trim)`,
										}}
									/>
									<p className='text-danger-color text-fontsize-brittle'>
										Report Group
									</p>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{addMembersModal && (
				<BreezeModal
					width={"w-40%"}
					isModalOpen={addMembersModal}
					closeModal={() => setAddMembersModal(false)}
					backgroundColor={"bg-white"}
					key={"add_members_to_group"}
					isDismissible={true}
					children={
						<CreateGroupProvider>
							<StepperTwo
								fetchAgain={fetchAgain}
								setFetchAgain={setFetchAgain}
								existingUser={selectedChat?.users?.filter(
									(item) => user?.userId !== item?._id
								)}
								isEditGroup={true}
								closeModal={() => setAddMembersModal(false)}
							/>
						</CreateGroupProvider>
					}
				/>
			)}
		</div>
	);
};

export default BreezeGroupProfile;
