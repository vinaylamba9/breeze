import { useRef, useState, useEffect, Fragment, useCallback } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChatState } from "@Context/chatProvider";
import { MdInfo } from "react-icons/md";
import { InputType } from "@Constants/application";
import BreezeButton from "@Components/breezeButton/breezeButton.components";
import { MiscAPI } from "@API/misc/misc.API";
import useAvatarColorGenerator from "@Shared/hooks/useAvatarColorGenerator";
import useAvatarInitials from "@Shared/hooks/useAvatarInitials";
import { ChatDAO } from "@/modules/chat/core/chatDAO";

const BreezeProfileAvatar = ({
	profileImage,
	setSelectedChatProfile,
	title,
	setFetchAgain,
	fetchAgain,
}) => {
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
	const [hexColor, textColor] = useAvatarColorGenerator(title);
	const initials = useAvatarInitials(title);
	const [imagePreview, setImagePreview] = useState(null);

	const onUpdateGroupImageHandler = useCallback(
		async (url) => {
			const response = await ChatDAO.updateGroupChatImageDAO({
				chatID: selectedChat?._id,
				groupImage: url,
			});
			setSelectedChatProfile(true);
			setSelectedChat(response?.responseData);
			setFetchAgain(!fetchAgain);
		},
		[
			fetchAgain,
			selectedChat?._id,
			setFetchAgain,
			setSelectedChat,
			setSelectedChatProfile,
		]
	);
	const handleImageChange = useCallback(
		async (e) => {
			const selectedFile = e.target.files[0];
			// Check if selected file is of type PNG or JPEG
			if (
				selectedFile &&
				(selectedFile.type === "image/png" ||
					selectedFile.type === "image/jpeg")
			) {
				const reader = new FileReader();
				const data = new FormData();
				data?.append("file", selectedFile);
				data.append("upload_preset", process.env.REACT_APP_NAME);
				data.append("cloud_name", process.env.REACT_APP_CLOUDNAME);

				reader.onload = () => {
					setImagePreview(reader?.result);
				};
				reader.readAsDataURL(selectedFile);
				const response = await MiscAPI.uploadImage(data);
				onUpdateGroupImageHandler(response?.responseBody?.secure_url);

				toast.success("Image uploaded successfully.", {
					transition: Slide,
					icon: "🚀",
					style: {
						// borderRadius: "1rem",
						color: "var(--color-darkTeal)",
						boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
					},
					progressStyle: { background: "var(--color-darkTeal)" },
				});
			} else {
				// Invalid file type, reset the image preview
				setImagePreview(null);
				return toast.info("Only PNG/JPEG formats are allowed", {
					transition: Slide,
					icon: "🚀",
					style: {
						// borderRadius: "1rem",
						color: "var(--color-darkTeal)",
						boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
					},
					progressStyle: { background: "var(--color-darkTeal)" },
				});
			}
		},
		[onUpdateGroupImageHandler]
	);
	const removeImageHandler = () => {
		setImagePreview(null);
		onUpdateGroupImageHandler("");
	};

	return (
		<Fragment>
			<ToastContainer />
			<div className='w-full flex items-center flex-col justify-center'>
				{imagePreview || profileImage ? (
					<div className='h-36 w-36 border-2 border-color-darkTeal rounded-full bg-color-TealWithOpacity cursor-pointer flex justify-center items-center shadow-inner shadow-color-darkTeal'>
						<img
							src={imagePreview || profileImage}
							id='photo'
							alt='preview'
							className='w-32 h-32 rounded-full bg-no-repeat bg-center cursor-pointer'
						/>
					</div>
				) : (
					<>
						<input
							type={InputType.FILE}
							className='hidden'
							id='uploadImage'
							name='avatarImage'
							onChange={handleImageChange}
						/>
						<label
							htmlFor='uploadImage'
							className='h-36 w-36 border-2 border-color-darkTeal rounded-full  cursor-pointer flex justify-center items-center shadow-inner shadow-color-darkTeal'>
							<div
								className={
									!!profileImage
										? `h-36 w-36 relative flex justify-center items-center rounded-full  text-xl uppercase`
										: `h-36 w-36 relative flex justify-center items-center rounded-full  text-xl uppercase`
								}
								style={{
									backgroundColor: hexColor,
									color: textColor,
								}}>
								{profileImage || imagePreview ? (
									<img
										className='h-36 w-36 rounded-full'
										src={profileImage || imagePreview}
										alt='profile'
									/>
								) : (
									initials
								)}
							</div>
						</label>
					</>
				)}

				<div className='text-sm  text-gray-400 tracking-normal flex items-center gap-1 mt-2'>
					<span>
						<MdInfo />{" "}
					</span>
					<span>Only JPEG / PNG format are allowed.</span>
				</div>
				{(imagePreview || profileImage) && (
					<BreezeButton
						width={"w-20%"}
						buttonClass={"py-0 mt-2 mb-2"}
						label={"Remove Image"}
						backgroundColor={`var(--color-darkTeal)`}
						textColor={`var(--text-color-purity)`}
						onClickHandler={removeImageHandler}
					/>
				)}
			</div>
		</Fragment>
	);
};

export default BreezeProfileAvatar;
