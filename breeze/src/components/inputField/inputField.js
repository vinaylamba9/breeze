import PropTypes from "prop-types";
import { Fragment, useEffect } from "react";
import { useRef, useState } from "react";

const InputField = ({
	type,
	name,
	maxLength,
	placeholder,
	onChangeHandler,
	value,
	errorMsg,
	trailingIcon,
	iconClickHandler,
	validators,
	errors,
	disabled,
	required,
	// setError,
	register,
	isError,
	validationSchema,
}) => {
	const inputRef = useRef();
	const [localError, setLocalError] = useState(false);

	const formatRegister = { ...register(name, required && validationSchema) };

	useEffect(() => {
		if (errors[name]?.message) {
			setLocalError(true); // sets background in case there was an error
		} else {
			setLocalError(false); // unsets background in case there is no error
		}
	}, [errors, name]);

	useEffect(() => {
		Object.keys(errors);
	});
	return (
		<Fragment>
			<div className='flex flex-row  content-center justify-center items-center py-2%  '>
				<input
					className={
						`rounded-3xl 
                            text-background-color-dark
                            bg-color-TealWithOpacity 
                            w-60% px-8 py-2.5
                            outline-none border-none
                            text-fontsize-brittle
                            focus:outline-2 focus:outline-color-darkTeal focus:bg-white`
						// !localError
						// 	? `rounded-3xl
						//     text-background-color-dark
						//     bg-color-TealWithOpacity
						//     w-60% px-8 py-2.5
						//     outline-none border-none
						//     text-fontsize-brittle
						//     focus:outline-2 focus:outline-color-darkTeal focus:bg-white`
						// 	:
						//      `rounded-3xl
						// text-background-color-dark
						// bg-dangerColorWithOpacity
						// w-60%  px-5% py-2.5
						// border-none
						// text-fontsize-brittle
						// outline-2 outline-danger-color `
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
						<div className='text-danger-color w-60% text-fontsize-brittle flex'>
							{errors[name]?.message && `* ${errors[name]?.message}`}
						</div>
				  )
				: false}
			{required && disabled
				? errors &&
				  errors[name] && (
						<div className='text-danger-color w-60% text-fontsize-brittle flex'>
							{errors[name]?.message && `* ${errors[name]?.message}`}
						</div>
				  )
				: false}
			{isError && (
				<div className='text-danger-color w-60% text-fontsize-brittle flex'>
					* {errorMsg}
				</div>
			)}
		</Fragment>
	);
};

InputField.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	trailingIcon: PropTypes.element,
	placeholder: PropTypes.string.isRequired,
	// onChangeHandler: PropTypes.func.isRequired,
	onIconToggleHandler: PropTypes.func,
	// validators: PropTypes.array,
	// errorMsg: PropTypes.string,
	// value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
export default InputField;
