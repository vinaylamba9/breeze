import { Fragment } from "react";
import { InputFieldStyleType } from "@Constants/application";
const BreezeInputField = ({
	type,
	name,
	maxLength,
	placeholder,
	onChangeHandler,
	errorMsg,
	trailingIcon,
	iconClickHandler,
	errors,
	disabled,
	required,
	register,
	isError,
	validationSchema,
	iconStyle,
	inputBoxType,
}) => {
	const formatRegister = { ...register(name, required && validationSchema) };

	return (
		<Fragment>
			<div className='w-100% flex flex-row content-center justify-center items-center py-2%'>
				{inputBoxType !== InputFieldStyleType.UNDERLINE ? (
					<input
						className={
							errors && errors[name]
								? ` mx-1 w-100% rounded-3xl 
						text-background-color-dark
						bg-danger-colorWithOpacity
						px-8 py-4
						ease-out duration-300
						outline-none border-none
						text-fontsize-brittle
						focus:outline
						focus:ring-2 focus:bg-danger-colorWithOpacity  focus:ring-danger-color
						`
								: ` mx-1 rounded-3xl 
                            text-background-color-dark
                            bg-color-TealWithOpacity 
                            w-100% px-8 py-4
							ease-out duration-300
							outline-none border-none
                            text-fontsize-brittle
							focus:outline
                            focus:ring-2 focus:bg-color-TealWithOpacity  focus:ring-color-darkTeal
                            `
						}
						type={type}
						name={name}
						placeholder={placeholder}
						{...register(name, required && validationSchema)}
						onChange={(e) => {
							formatRegister.onChange(e);
							onChangeHandler?.(e);
						}}
						// onBlur={(e) => {
						// 	formatRegister.onBlur(e);
						// 	onBlurHandler?.(e);
						// }}
						// onKeyDown={(e) => {
						// 	// formatRegister.onKeyDown(e);
						// 	onKeyDownHandler?.(e);
						// }}
						id={name}
						disabled={disabled}
						required={required}
						maxLength={maxLength}
						onWheel={(e) => e.target.blur()}
						autoComplete='off'
					/>
				) : (
					<div>
						<input
							type={type}
							class='w-100% border-b-2 border-gray outline-none focus:border-color-darkTeal'
							placeholder={placeholder}
						/>
					</div>
				)}
				{trailingIcon && (
					<div
						className={`${
							iconStyle ? iconStyle : "cursor-pointer absolute right-52 "
						}`}
						onClick={iconClickHandler}>
						{trailingIcon}
					</div>
				)}
			</div>

			{required && !disabled
				? errors &&
				  errors[name] && (
						<div className='text-danger-color text-left   text-fontsize-brittle  mt-1 mx-1  '>
							{errors[name]?.message && `* ${errors[name]?.message}`}
						</div>
				  )
				: false}
			{isError && (
				<div className='text-danger-color text-left  text-fontsize-brittle  mt-1 mx-1'>
					* {errorMsg}
				</div>
			)}
		</Fragment>
	);
};

export default BreezeInputField;
