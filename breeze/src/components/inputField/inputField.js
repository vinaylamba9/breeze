import { InputType } from 'constants/application';
import PropTypes from 'prop-types';
import { Fragment, useEffect } from 'react';
import { useRef, useState } from 'react';


const InputField = ({ type, name, placeholder, onChangeHandler, value, errorMsg, trailingIcon, onIconToggleHandler, validators, accept }) => {

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
            <div className="flex flex-row  content-center justify-center items-center py-2%  ">
                <input
                    ref={inputRef}
                    className={
                        error ?
                            `rounded-3xl 
                        text-background-color-dark
                        bg-dangerColorWithOpacity
                        w-60%  px-5% py-2.5
                        border-none
                        text-fontsize-brittle
                        outline-2 outline-danger-color ` :
                            `rounded-3xl 
                            
                        text-background-color-dark
                        bg-color-TealWithOpacity 
                        w-60% px-8 py-2.5
                        outline-none border-none
                        text-fontsize-brittle
                        focus:outline-2 focus:outline-color-darkTeal focus:bg-white`
                    }
                    style={{ visibility: type === InputType.FILE ? "visible" : "visible" }}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeHandler}
                    accept={accept && accept}
                />
                {
                    trailingIcon && <div style={{ cursor: "pointer", position: "absolute", right: "12%" }}
                        onClick={onIconToggleHandler}>{trailingIcon}
                    </div>
                }

            </div>
            {error && <div className="text-danger-color w-60% text-fontsize-brittle flex">* {error}</div>}
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
    validators: PropTypes.array,
    errorMsg: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}
export default InputField


// className = {!(error === "") ?
    // `rounded-3xl text-background-color-dark w-60%  m-0.5  px-8 py-2.5 outline-none border-none text-fontsize-brittle bg-dangerColorWithOpacity outline-2 outline-danger-color ` :
    // `rounded-3xl bg-color-TealWithOpacity text-background-color-dark w-60% m-0.5 px-8 py-2.5 outline-none border-none text-fontsize-brittle focus:outline-2 focus:outline-color-darkTeal focus:bg-white`}