import { useRef, useState, useEffect, Fragment, useCallback } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ImUpload } from "react-icons/im";
import { MdInfo } from "react-icons/md";
import { InputType } from "@Constants/application";
import BreezeButton from "@Components/breezeButton/breezeButton.components";
import { MiscAPI } from "@API/misc/misc.API";
import { useCreateGroupState } from "@Context/createGroupProvider";

const BreezeImageUpload = ({ setGroupImageURL, isEdit }) => {
	const uploadedImageRef = useRef(null);
	const [imagePreview, setImagePreview] = useState(null);
	const { formDetails, setFormDetails } = useCreateGroupState();
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
					setFormDetails({ ...formDetails, profileImage: reader?.result });
				};
				reader.readAsDataURL(selectedFile);
				const response = await MiscAPI.uploadImage(data);

				setGroupImageURL(response?.responseBody?.secure_url);
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
		[formDetails, setFormDetails, setGroupImageURL]
	);

	const removeImageHandler = () => {
		setFormDetails({ ...formDetails, profileImage: null });
		setImagePreview(null);
	};

	useEffect(() => {
		setImagePreview(formDetails?.profileImage);
		return () => {
			// Clean up the image preview when the component is unmounted
			setImagePreview(null);
		};
	}, [formDetails]);
	return (
		<Fragment>
			<ToastContainer />
			<div className='w-full flex items-center flex-col justify-center'>
				{imagePreview ? (
					<div className='h-36 w-36 border-2 border-color-darkTeal rounded-full bg-color-TealWithOpacity cursor-pointer flex justify-center items-center shadow-inner shadow-color-darkTeal'>
						<img
							ref={uploadedImageRef}
							src={imagePreview}
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
							className='h-36 w-36 border-2 border-color-darkTeal rounded-full bg-color-TealWithOpacity cursor-pointer flex justify-center items-center shadow-inner shadow-color-darkTeal'>
							<ImUpload
								style={{
									color: `var(--color-darkTeal)`,
									fontSize: `var(--fontsize-strong)`,
								}}
							/>
						</label>
					</>
				)}

				<div className='text-sm  text-gray-400 tracking-normal flex items-center gap-1 mt-2'>
					<span>
						<MdInfo />{" "}
					</span>
					<span>Only JPEG / PNG format are allowed.</span>
				</div>
				{imagePreview && (
					<BreezeButton
						width={"w-20%"}
						buttonClass={"py-2 mt-2 mb-2"}
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

export default BreezeImageUpload;
