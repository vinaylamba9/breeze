import PropTypes from "prop-types";

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
			className='flex w-60% outline-none border-none cursor-pointer rounded-3xl mx-4 my-4 px-8 py-3.5 text-fontsize-brittle active:opacity-90 active:bg-primaryColorWithOpacity active:transition-all'>
			<div className='left-0'>
				{icon && <img src={icon} height='20' width='20' alt='google' />}
			</div>
			<div className='flex basis-100% justify-center'>{label}</div>
		</div>
	);
};

BreezeButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClickHandler: PropTypes.func.isRequired,
	icon: PropTypes.string,
	backgroundColor: PropTypes.string,
	textColor: PropTypes.string,
};

BreezeButton.defaultProps = {
	icon: "",
	textColor: `var(--text-color-dark)`,
	backgroundColor: `var(--background-color-light)`,
};
export default BreezeButton;
