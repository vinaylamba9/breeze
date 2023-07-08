const BreezeButton = ({
	label,
	onClickHandler,
	icon,
	backgroundColor,
	textColor,
	buttonClass,
	width,
	isDisabled = false,
}) => {
	return (
		<div className='flex flex-row content-center justify-center items-center py-2%'>
			<button
				disabled={isDisabled}
				onClick={onClickHandler}
				style={{
					backgroundColor: !isDisabled && backgroundColor,
					color: !isDisabled && textColor,
				}}
				className={`mx-1 rounded-3xl  drop-shadow
				text-background-color-dark
				${isDisabled ? "bg-color-slate" : "bg-color-TealWithOpacity "}
				w-100% px-8 py-4
				ease-out duration-300
				outline-none border-none
				text-fontsize-brittle
				focus:outline
				focus:ring-2 focus:bg-color-TealWithOpacity  focus:ring-color-darkTeal`}>
				<div className='flex justify-center items-center gap-5'>
					{icon && (
						<span className='left-0'>
							<img src={icon} height='20' width='20' alt='google' />
						</span>
					)}
					<span className='ease-out duration-300 hover:tracking-wide text-base'>
						{label}
					</span>
				</div>
			</button>
		</div>
	);
};

export default BreezeButton;
