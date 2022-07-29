import PropTypes from 'prop-types';
import { Fragment, useEffect } from 'react';
import { useRef, useState } from 'react';


const InputField = ({ type, name, placeholder, onChangeHandler, value, errorMsg, trailingIcon, onIconToggleHandler, validators }) => {

    const inputRef = useRef();
    const [error, setError] = useState(errorMsg);

    useEffect(() => {
        setError(errorMsg)
        return () => {
            setError("")
        }
    }, [errorMsg])


    return (
        <Fragment>
            <div className="flex flex-col content-center items-center py-4 ">
                <input
                    ref={inputRef}
                    className={!(error === "") ? `rounded-3xl text-background-color-dark w-1/2 m-0.5 py-0.5 px-8 outline-none border-none text-fontsize-brittle bg-dangerColorWithOpacity outline-2 outline-danger-color focus:outline-2 focus:outline-color-darkTeal focus:bg-white` : `rounded-3xl bg-color-TealWithOpacity text-background-color-dark w-1/2 m-0.5 py-0.5 px-8 outline-none border-none text-fontsize-brittle`}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeHandler}
                />
                {
                    trailingIcon && <span style={{ position: "absolute", right: "12%" }}
                        onClick={onIconToggleHandler}>{trailingIcon}
                    </span>
                }

            </div>
            {error && <div className="text-danger-color w-1/2 text-fontsize-brittle flex">* {error}</div>}
        </Fragment>
    )
}


InputField.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    trailingIcon: PropTypes.element,
    placeholder: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    onIconToggleHandler: PropTypes.func,
    validators: PropTypes.array.isRequired,
    errorMsg: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
}
export default InputField