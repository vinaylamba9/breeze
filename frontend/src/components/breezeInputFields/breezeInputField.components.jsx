/* eslint-disable react/prop-types */
import { Fragment } from "react";

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
}) => {
	const formatRegister = { ...register(name, required && validationSchema) };

	return (
		<Fragment>
			<div className='flex flex-row  content-center justify-center items-center py-2%  '>
				<input
					className={
						errors && errors[name]
							? `rounded-3xl 
						text-background-color-dark
						bg-danger-colorWithOpacity
						w-60% px-8 py-4
						ease-out duration-300
						outline-none border-none
						text-fontsize-brittle
						focus:outline
			
						focus:ring-2 focus:bg-danger-colorWithOpacity  focus:ring-danger-color
						`
							: `rounded-3xl 
							
                            text-background-color-dark
                            bg-color-TealWithOpacity 
                            w-60% px-8 py-4
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
				{trailingIcon && (
					<div
						style={{ cursor: "pointer", position: "absolute", right: "12%" }}
						onClick={iconClickHandler}>
						{trailingIcon}
					</div>
				)}
			</div>

			{required && !disabled
				? errors &&
				  errors[name] && (
						<div className='text-danger-color text-left w-60% flex text-fontsize-brittle  -mt-3 '>
							{errors[name]?.message && `* ${errors[name]?.message}`}
						</div>
				  )
				: false}
			{isError && (
				<div className='text-danger-color text-left w-60% flex text-fontsize-brittle  -mt-3 '>
					* {errorMsg}
				</div>
			)}
		</Fragment>
	);
};

export default BreezeInputField;
