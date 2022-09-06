import { Fragment, useRef } from "react"


const FileUpload = ({ type, name, onChangeHandler, value, accept }) => {

    const fileRef = useRef();



    return (
        <Fragment>
            <div>
                <input ref={fileRef}
                    type={type}
                    id="file"
                    className="rounded-3xl 
                        text-background-color-dark
                        w-60%  py-2.5
                        outline-none border-none
                        text-fontsize-brittle
                        focus:bg-white "
                    name={name} accept={accept && accept}
                    onChange={onChangeHandler}
                />
                <label className="text-text-color-purity cursor-pointer flex w-60% rounded-3xl justify-center py-2.5 mb-2% bg-color-darkTeal" htmlFor="file">Choose your avatar</label>
            </div>
        </Fragment >
    )
}

export default FileUpload