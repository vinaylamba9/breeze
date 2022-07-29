import PropTypes from "prop-types";


const Button = ({ label, onClickHandler, icon, backgroundColor, textColor }) => {
    console.log(label)
    return (
        <div onClick={onClickHandler} style={{ backgroundColor: backgroundColor, color: textColor }}
            className="flex w-60% outline-none border-none cursor-pointer rounded-3xl mx-4 my-4 px-8 py-3.5 text-fontsize-brittle active:opacity-90 active:bg-primaryColorWithOpacity active:transition-all">
            <div className="">
                {icon && <img src={icon} height="20" width="20" alt="icon" />}
            </div >
            <div className="flex basis-11/12 justify-center">
                <p>{label}</p>
            </div>
        </div >
    )
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    icon: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string
}

Button.defaultProps = {
    icon: "",
    textColor: `var(--text-color-dark)`,
    backgroundColor: `var(--background-color-light)`
}
export default Button