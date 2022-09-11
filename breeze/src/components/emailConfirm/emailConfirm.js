import { useRef, useState } from "react";
import InputField from "components/inputField/inputField"
import ToggleOnBoard from "components/toggleOnboard/toggleOnBoard"
import TypewriterLabel from "components/typewriterLabel/typewriterLabel"
import Routes from "constants/routes"
import Button from "components/button/button"
import { InputType } from "constants/application"
import useForm from "hooks/useForm";
import { ValidateInput } from "constants/inputValidators";
import { _isNull } from "utils/basicUtils";
import { userDAO } from "core/user/userDAO";
import Toast from "components/toast/toast";
import Spinner from "components/spinner/spinner";


const EmailConfirm = () => {
    const [toastComponent, setToastComponent] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const userEmailConfirmInfo = useRef({
        "email": ""
    })


    const { inputChangeHandler, formValues, error, onSubmitHandler } = useForm(userEmailConfirmInfo.current);
    return (
        <div className='flex flex-col animate-fadeIn'>
            <ToggleOnBoard label='Back to Breeze? ' linkLabel='Login' link={Routes.LOGINROUTE} />
            <center>
                <div className='mt-10% text-fontsize-brittle'>
                    <TypewriterLabel label="Forgot Password? " />
                    <span className="text-background-color-metal font-thin ">Don't worry! It happens. <br />Please enter the email associated with your account.</span>
                    <br />  <br />
                    <InputField
                        type={InputType.EMAIL}
                        name="email"
                        placeholder="*  Email address"
                        onChangeHandler={inputChangeHandler}
                        validators={[ValidateInput.required, ValidateInput.email]}
                        errorMsg={error["email"]}
                        value={formValues["email"]}
                    />
                    <br />
                    {
                        !isLoading ? <Button
                            label="Confirm with Breeze"
                            backgroundColor={`var(--color-darkTeal)`}
                            textColor={`var(--text-color-purity)`}
                            onClickHandler={async () => {
                                setIsLoading(true)
                                if (!_isNull(formValues.email)) {
                                    const result = await userDAO.forgotPasswordDAO(formValues)
                                    setIsLoading(false)
                                    setToastComponent(<Toast statusCode={result.statusCode} toastTitle="OTP" toastSubtitle={result.responseBody.data} autoDismissable />)
                                    formValues["email"] = ""
                                } else {
                                    onSubmitHandler()
                                    setIsLoading(false)
                                }
                            }}
                        /> : <Spinner />
                    }
                    {toastComponent && toastComponent}
                </div>
            </center>
        </div>
    )
}

export default EmailConfirm