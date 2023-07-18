import { Fragment, useCallback, useEffect, useState } from "react";
import { FiEdit3, FiCheck } from "react-icons/fi";
import { CHAT_UTILS } from "@Shared/utils/chat.utils";
import { useForm } from "react-hook-form";
import { useChatState } from "@Context/chatProvider";
import { MdBlock, MdReport, MdDelete, MdOutlineMail } from "react-icons/md";
import { InputType } from "@Constants/application";
import { useSelectUserFomGroupState } from "@Context/selectUserFromGroupProvider";
import BreezeProfileAvatar from "@Components/breezeProfileAvatar/breezeProfileAvatar.components";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
const BreezeSelfProfile = ({ fetchAgain, setFetchAgain }) => {
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
	const { selectUserFromGroup, setSelectUserFromGroup } =
		useSelectUserFomGroupState();
	const [isEditProfileName, setEditProfileName] = useState(false);
	const [isEditProfileBio, setEditProfileBio] = useState(false);
	const renameGroupNameHandler = useCallback(async (d) => {}, []);

	useEffect(() => {
		setValue("editProfileName", user?.name);
		setValue("editProfileBio", user?.bio);
	}, [setValue, user?.name, user?.bio]);
	return (
		<>
			<div className=' text-fontsize-glossy font-medium pl-2 relative -mt-0.5 left-10 '>
				Profile Info
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
							isIndividual={true}
							fetchAgain={fetchAgain}
							setFetchAgain={setFetchAgain}
							title={user?.name}
							profileImage={user?.profileImage}
						/>

						<div className='my-5 w-90%'>
							{isEditProfileName ? (
								<div className=' flex items-center justify-start gap-5'>
									<div className='w-90% '>
										<BreezeInputField
											type={InputType.EMAIL}
											name='editProfileName'
											register={register}
											errors={errors}
											validationSchema={{
												required: "Please enter the full name",
											}}
											placeholder='Enter full name'
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
										{user?.name}
									</div>
									<div
										className='cursor-pointer'
										onClick={() => setEditProfileName(true)}>
										<FiEdit3
											style={{
												color: `var(--color-darkTeal)`,
												fontSize: `var(--fontsize-trim)`,
											}}
										/>
									</div>
								</div>
							)}
							<div className='flex justify-center items-center gap-2 mt-3 cursor-pointer'>
								<MdOutlineMail
									style={{
										color: `var(--color-darkTeal)`,
										fontSize: `var(--fontsize-trim)`,
									}}
								/>
								<Fragment className='mt-1 text-center text-slate-400 ease-out duration-300 hover:tracking-wider'>
									{user?.email}
								</Fragment>
							</div>
						</div>
					</div>
				</div>
				<div className='w-100% flex items-start justify-center my-6 bg-white rounded-2xl'>
					{isEditProfileBio ? (
						<div className=' w-100% '>
							<div className='w-100% mx-auto  p-3'>
								<p className='text-fontsize-virgin tracking-wide px-3'>About</p>
								<BreezeInputField
									type={InputType.TEXT}
									name='editProfileBio'
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
							<p className='text-color-darkTeal'>{user?.bio}</p>
						</div>
					)}
					{isEditProfileBio ? (
						<div
							className='cursor-pointer pt-3 pr-5'
							// onClick={handleSubmit(renameGroupBioHandler)}
						>
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
							onClick={() => setEditProfileBio(true)}>
							<FiEdit3
								style={{
									color: `var(--color-darkTeal)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default BreezeSelfProfile;
