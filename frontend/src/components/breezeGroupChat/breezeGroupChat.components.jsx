import { useState } from "react";
import { MdInfo } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreezeImageUpload from "@Components/breezeImageUpload/breezeImageUpload.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezePills from "@Components/breezePills/breezePills.components";
import BreezeButton from "@Components/breezeButton/breezeButton.components";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import { EmailRegEx, InputType } from "@Constants/application";

const BreezeGroupChat = ({ userList }) => {
	const [selectedUser, setSelectedUser] = useState([]);
	const [groupImageURL, setGroupImageURL] = useState(null);
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	const onSelectUsersHandler = (user, index) => {
		if (selectedUser?.includes(user)) {
			return toast.error("Users already selected.", {
				transition: Slide,
				style: {
					color: "var(--color-darkTeal)",
					boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
				},
				progressStyle: { background: "var(--danger-color)" },
			});
		}
		setSelectedUser([...selectedUser, user]);
	};
	const onRemoveSelectedUser = (user) => {
		setSelectedUser(selectedUser?.filter((item) => item?._id !== user?._id));
	};
	return (
		<>
			<ToastContainer />
			<div className='w-90% mx-auto select-none'>
				<div className='flex items-center justify-start gap-1 '>
					<div className='w-30% flex flex-col justify-between  items-start'>
						<div className='absolute top-16'>
							<h2 className='text-fontsize-pearl text-color-darkTeal font-bold'>
								Create group chat
							</h2>

							<div className='text-sm text-gray-400 tracking-normal flex items-center gap-1'>
								<span>
									<MdInfo />{" "}
								</span>
								<span>Click on users to create chat.</span>
							</div>
						</div>
						<div>
							<BreezeImageUpload
								setGroupImageURL={setGroupImageURL}
								groupImageURL={groupImageURL}
							/>
						</div>
						<BreezeInputField
							type={InputType.TEXT}
							name='groupName'
							register={register}
							// trailingIcon={
							// 	<MdEmail
							// 		style={{
							// 			color: `var(--color-darkTeal)`,
							// 			fontSize: `var(--fontsize-glossy)`,
							// 		}}
							// 	/>
							// }
							errors={errors}
							validationSchema={{
								required: "Please enter group name .",
							}}
							placeholder='Group name'
							required
						/>
					</div>
					<div className='w-70%'>
						<div className=' mt-10 '>
							<BreezeSearch
								placeholder={"Search user"}
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
						<div className='mt-5 flex flex-nowrap items-center justify-start overflow-x-scroll gap-1'>
							{selectedUser?.map((item) => (
								<div key={item} className='flex-shrink-0'>
									<BreezePills
										title={item?.name}
										onRemove={() => onRemoveSelectedUser(item)}
									/>
								</div>
							))}
						</div>
						<div
							className='w-100% mt-5  '
							style={{
								minHeight: "55vh",
							}}>
							<div
								className='my-2 rounded-2xl flex flex-wrap gap-1 items-center justify-between'
								style={{
									maxHeight: "50vh",
									minHeight: "50vh",
									overflowY: "scroll",
								}}>
								{userList?.map((item, index) => {
									return (
										<div className='w-48%' key={"group_chat_users_" + index}>
											<BreezeTile
												onClickHandler={() => onSelectUsersHandler(item, index)}
												title={item?.name}
												imgBackgroundColor={item?.imgBackgroundColor}
												msg={item?.msg}
												isActive={item?.isActive}
												isGrouped={item?.isGrouped}
												profileImage={item?.profileImage}
												isNotification={item?.isNotification}
												bio={item?.bio}
												styleClass={
													"bg-white py-4 rounded-2xl transform  hover:bg-color-TealWithOpacity  transition duration-300 ease-in-out"
												}
											/>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<div className='flex justify-center items-center mb-2'>
					<BreezeButton
						width={"w-20%"}
						buttonClass={"py-4"}
						label={"Create group"}
						backgroundColor={`var(--color-darkTeal)`}
						textColor={`var(--text-color-purity)`}
						// onClickHandler={removeImageHandler}
					/>
				</div>
			</div>
		</>
	);
};

export default BreezeGroupChat;
