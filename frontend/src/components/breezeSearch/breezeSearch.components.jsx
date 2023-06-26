import { InputType } from "@Constants/application";
import { Fragment } from "react";

const BreezeSearch = ({
	name,
	placeholder,
	onChangeHandler,
	leadingIcon,
	disabled,
	register,
}) => {
	const formatRegister = { ...register(name) };
	return (
		<Fragment>
			<div
				// style={{
				// 	boxShadow:
				// 		"0 3px 6px rgba(0,0,0,0.0006), 0 3px 6px rgba(0,0,0,0.103)",
				// }}
				className='flex items-center justify-start
                    bg-background-color-light gap-2  
                    px-2   
                    rounded-3xl '>
				<span className='ml-2'>{leadingIcon}</span>
				<input
					className={` 
                            text-background-color-dark
                            px-2 py-3 w-100%
							ease-out duration-300 
							outline-none border-none
                            text-fontsize-brittle
                            `}
					type={InputType.TEXT}
					name={name}
					placeholder={placeholder}
					{...register(name)}
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
					onWheel={(e) => e.target.blur()}
					autoComplete='off'
				/>
			</div>
		</Fragment>
	);
};

export default BreezeSearch;
