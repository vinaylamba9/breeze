import { useCallback, useState } from "react";
import { MdGroup } from "react-icons/md";
import { MdOutlineSubtitles } from "react-icons/md";
import { useForm } from "react-hook-form";
import BreezeImageUpload from "@Components/breezeImageUpload/breezeImageUpload.components";
import BreezeInputField from "@Components/breezeInputFields/breezeInputField.components.jsx";
import { InputType } from "@Constants/application";
import BreezeButton from "@Components/breezeButton/breezeButton.components";
const StepperOne = ({ setFormDetails, formDetails, handleNext }) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});
	const [groupImageURL, setGroupImageURL] = useState(null);

	const onClickNextHandler = useCallback(
		(d) => {
			handleNext();
			console.log(d);
		},
		[handleNext]
	);
	return (
		<div className='mt-5 w-60% mx-auto'>
			<BreezeImageUpload
				setGroupImageURL={setGroupImageURL}
				groupImageURL={groupImageURL}
			/>
			<div className='mt-5 w-100% '>
				<div className='my-5'>
					<BreezeInputField
						type={InputType.TEXT}
						name='groupName'
						register={register}
						trailingIcon={
							<MdGroup
								style={{
									color: `var(--color-darkTeal)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						}
						errors={errors}
						validationSchema={{
							required: "Please enter group name .",
						}}
						placeholder='Group name'
						required
						iconStyle={"cursor-pointer absolute right-60"}
					/>
				</div>
				<div className='my-5'>
					<BreezeInputField
						type={InputType.TEXT}
						name='groupBio'
						register={register}
						trailingIcon={
							<MdOutlineSubtitles
								style={{
									color: `var(--color-darkTeal)`,
									fontSize: `var(--fontsize-glossy)`,
								}}
							/>
						}
						placeholder='Group bio'
						iconStyle={"cursor-pointer absolute right-60"}
					/>
				</div>
			</div>
			{watch("groupName")?.length > 0 && (
				<BreezeButton
					buttonClass={"py-4 mt-2 mb-2"}
					label={"Next Step"}
					backgroundColor={`var(--color-darkTeal)`}
					textColor={`var(--text-color-purity)`}
					onClickHandler={handleSubmit(onClickNextHandler)}
				/>
			)}
		</div>
	);
};

export default StepperOne;
