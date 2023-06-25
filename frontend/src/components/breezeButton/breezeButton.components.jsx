const BreezeButton = ({
	label,
	onClickHandler,
	icon,
	backgroundColor,
	textColor,
}) => {
	return (
		<div
			onClick={onClickHandler}
			style={{
				backgroundColor: backgroundColor,
				color: textColor,
				boxShadow: "1px 5px 15px rgba(0, 0, 0, 0.1)",
			}}
			className='flex 
			justify-center
			w-60% outline-none
			border-none 
			gap-4
			items-center
			cursor-pointer 
			rounded-3xl 
			mx-4 my-4 px-8 py-4
			text-fontsize-brittle 
			active:opacity-90 active:bg-primaryColorWithOpacity 
			active:transition-all'>
			<div className='left-0'>
				{icon && <img src={icon} height='20' width='20' alt='google' />}
			</div>
			<div className='ease-out duration-300 hover:tracking-wide'>{label}</div>
		</div>
	);
};

export default BreezeButton;
