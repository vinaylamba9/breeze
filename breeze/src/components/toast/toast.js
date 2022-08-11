import { HTTPStatusCode } from "constants/network";
import { useState, useEffect, useCallback, useRef } from "react";

const Toast = ({ statusCode, toastTitle, toastSubtitle, autoDismissable }) => {

    const [backgroundColor, setBackgroundColor] = useState();
    const [toastIcon, setToastIcon] = useState();
    const toastRef = useRef();
    const timeoutRef = useRef();

    const toastConfigurationSet = useCallback(() => {
        switch (statusCode) {
            case HTTPStatusCode.OK: {
                setBackgroundColor('bg-color-darkTeal');
                setToastIcon('info-circle');
                break;
            }
            case HTTPStatusCode.BAD_REQUEST: {
                setBackgroundColor('bg-danger-color');
                setToastIcon("exclamation-triangle");
                break;
            }
            case HTTPStatusCode.NOT_FOUND: {
                setBackgroundColor('bg-danger-color');
                setToastIcon("times-circle");
                break;
            }
            case HTTPStatusCode.UNAUTHORIZED: {
                setBackgroundColor('bg-danger-color');
                setToastIcon("times-circle");
                break;
            }
            default: {
                setBackgroundColor('bg-info-color');
                setToastIcon("exclamation-triangle");
                break;
            }
        }
    }, [statusCode])

    const dismissToast = useCallback(() => toastRef.current.removeChild(toastRef.current.firstElementChild), []);

    useEffect(() => {
        toastConfigurationSet();
    })
    useEffect(() => {
        timeoutRef.current = autoDismissable && setTimeout(() => {
            dismissToast()
        }, 3000);//Auto-dismmisable

        return () => {
            clearTimeout(timeoutRef.current);
        }
    }, [toastConfigurationSet, autoDismissable, dismissToast])

    return (
        <div ref={toastRef} key={statusCode} id="toast" className={`shadow-lg ${autoDismissable ? 'animate-fadeInOut' : 'animate-fadeIn'} flex flex- col justify-center`} >
            <div className={`${backgroundColor}  absolute top-2 right-2 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`} id="static-example" role="alert" aria-live="assertive" aria-atomic="true" >
                <div style={{ borderBottom: "1px solid white" }} className={`${backgroundColor} flex justify-between items-center py-2 px-3 bg-clip-padding border-b  rounded-t-lg`}>
                    <p className="font-bold text-white flex items-center">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon={toastIcon} className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
                        </svg>
                        {toastTitle}</p>
                    <div className="flex items-center">
                        {/* <p className="text-white opacity-90 text-xs">11 mins ago</p> */}
                        <button onClick={dismissToast} type="button" className="  btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none   focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline" aria-label="Close" >X</button>
                    </div>
                </div>
                <div style={{ backgroundColor: backgroundColor }} className="flex p-3 rounded-b-lg break-words text-white">
                    {toastSubtitle}
                </div>
            </div>
        </div >

    )
}

export default Toast