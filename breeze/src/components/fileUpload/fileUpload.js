import { Fragment, useRef, useEffect } from "react"


const FileUpload = ({ type, name, onChangeHandler, value, accept }) => {

    const fileRef = useRef();



    return (
        <Fragment>
            <div>
                <input ref={fileRef}
                    type={type}
                    className="rounded-3xl 
                        text-background-color-dark
                        w-60%  py-2.5
                        outline-none border-none
                        text-fontsize-brittle
                        focus:bg-white "
                    name={name} accept={accept && accept}
                    onChange={onChangeHandler}
                />
            </div>
        </Fragment>
    )
}

export default FileUpload