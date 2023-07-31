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
	label,
}) => {
	const formatRegister = { ...register(name, required && validationSchema) };

	return (
		<Fragment>
			<div className='w-100% '>
				<div
					tabIndex='0'
					className={
						errors && errors[name]
							? "w-100% flex flex-row ease-out duration-300 cursor-pointer content-center rounded-3xl ring-2 justify-center items-center  ring-danger-color focus-within:ring-2 active:ring-black "
							: "w-100% flex flex-row ease-out duration-300 cursor-pointer content-center rounded-3xl ring-2 justify-center items-center  ring-black focus-within:ring-2 active:ring-black"
					}>
					{inputBoxType !== InputFieldStyleType.UNDERLINE ? (
						<input
							className={
								errors && errors[name]
									? ` mx-1 w-100% rounded-3xl 
										py-4
									px-4 outline-none	
									text-fontsize-brittle
						`
									: `mx-1 rounded-3xl 
								w-100% px-4 py-4 
								outline-none	
								text-fontsize-brittle
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
								iconStyle ? iconStyle : "cursor-pointer relative right-5"
							}`}
							onClick={iconClickHandler}>
							{trailingIcon}
						</div>
					)}
				</div>
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
