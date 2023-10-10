import { InputType } from "@Constants/application";

const BreezeImageVideoAttachements = ({
	fileUploadName,
	fileUplaodID,
	fileAcceptType,
	isMultiple,
	icon,
	label,
}) => {
	const fileUplaodHandler = (e) => {
		let filesToUpload = e.target.files;

		filesToUpload?.forEach((file) => {});
		console.log(e.target.files);
	};
	return (
		<div>
			<input
				placeholder={fileUploadName}
				type={InputType.FILE}
				className='hidden'
				id={fileUplaodID}
				multiple={isMultiple}
				name={fileUploadName}
				accept={fileAcceptType}
				onChange={fileUplaodHandler}
			/>
			<label className='flex gap-2 cursor-pointer ' htmlFor={fileUplaodID}>
				{icon}
				<span className='group-hover:text-color-darkTeal group-hover:font-medium transition-all ease-out duration-300 '>
					{label}
				</span>
			</label>
		</div>
	);
};

export default BreezeImageVideoAttachements;
