const BreezeButton = ({
	label,
	onClickHandler,
	icon,
	backgroundColor,
	textColor,
	buttonClass,
	width,
}) => {
	return (
		<div
			onClick={onClickHandler}
			style={{
				backgroundColor: backgroundColor,
				color: textColor,
				boxShadow: "1px 5px 15px rgba(0, 0, 0, 0.1)",
			}}
			className={`flex 
			justify-center
			${width || "w-60%"} outline-none
			border-none 
			gap-4
			items-center
			cursor-pointer 
			rounded-3xl 
			text-fontsize-brittle 
			active:opacity-90 active:bg-primaryColorWithOpacity 
			active:transition-all ${buttonClass}`}>
			{icon && (
				<div className='left-0'>
					<img src={icon} height='20' width='20' alt='google' />
				</div>
			)}
			<div className='ease-out duration-300 hover:tracking-wide text-sm'>
				{label}
			</div>
		</div>
	);
};

export default BreezeButton;
