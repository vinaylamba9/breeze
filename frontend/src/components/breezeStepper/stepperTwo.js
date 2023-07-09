import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezePills from "@Components/breezePills/breezePills.components";
import BreezeButton from "@Components/breezeButton/breezeButton.components";
import { useCreateGroupState } from "@Context/createGroupProvider";
import { ChatDAO } from "@/modules/chat/core/chatDAO";
import { HTTPStatusCode } from "@Constants/network";
import { useChatState } from "@Context/chatProvider";
const StepperTwo = ({ handlePrev, closeModal }) => {
	const [selectedUser, setSelectedUser] = useState([]);
	const { formDetails, setFormDetails } = useCreateGroupState();
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
		setValue,
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
		const userToSelect = [...selectedUser, user];
		setSelectedUser(userToSelect);
		setFormDetails({
			...formDetails,
			users: userToSelect,
		});
	};

	const onRemoveSelectedUser = (user) => {
		const removedUser = selectedUser?.filter((item) => item?._id !== user?._id);
		setSelectedUser(removedUser);
		setFormDetails({
			...formDetails,
			users: removedUser,
		});
	};

	const onCreateGroupHandler = async () => {
		delete formDetails?.profileImage;
		const response = await ChatDAO.createGroupChatDAO(formDetails);
		if (response?.statusCode === HTTPStatusCode.OK) {
			setChats([response?.responseBody, ...chats]);
			setFormDetails({
				name: null,
				bio: null,
				groupImage: null,
				users: [],
				profileImage: null,
			});
			closeModal();
		}
	};
	useEffect(() => {
		setSelectedUser(formDetails?.users);
	}, [formDetails]);

	return (
		<>
			<ToastContainer />
			<div className='mt-5'>
				<div className=' mt-10 w-70% mx-auto'>
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
				<div className='mt-5 w-70% mx-auto flex flex-nowrap items-center justify-start overflow-x-scroll gap-1'>
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
					className='w-100% mt-5'
					style={{
						minHeight: "50vh",
					}}>
					<div
						className='my-2 rounded-2xl flex flex-wrap gap-1 items-center justify-between'
						style={{
							maxHeight: "45vh",
							minHeight: "45vh",
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
											"bg-white drop-shadow mx-2 py-4 rounded-2xl transform  hover:bg-color-TealWithOpacity transition duration-300 ease-in-out"
										}
									/>
								</div>
							);
						})}
					</div>
				</div>
				<div className='flex items-center justify-center  '>
					<BreezeButton
						label={"Previous step"}
						backgroundColor={`var(--color-darkTeal)`}
						textColor={`var(--text-color-purity)`}
						onClickHandler={handlePrev}
					/>
					{selectedUser?.length > 0 && (
						<BreezeButton
							label={"Create group "}
							backgroundColor={`var(--color-darkTeal)`}
							textColor={`var(--text-color-purity)`}
							onClickHandler={onCreateGroupHandler}
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default StepperTwo;
