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
import useIconToggle from "hooks/useIconToggle";

import { PasswordIconAiFillEye, PasswordIconAiFillEyeInvisible } from 'utils/utilsIcon';
const UpdatePasswordScreen = () => {
    const [toastComponent, setToastComponent] = useState("")
    const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
    const [isLoading, setIsLoading] = useState(false);

    const updatePasswordInfo = useRef({
        "otp": "",
        "updatedPassword": ""
    })

    const { inputChangeHandler, formValues, error, onSubmitHandler } = useForm(updatePasswordInfo.current);
    return (
        <div className='flex flex-col animate-fadeIn'>
            <ToggleOnBoard label='Back to Breeze? ' linkLabel='Login' link={Routes.LOGINROUTE} />
            <center>
                <div className='mt-10% text-fontsize-brittle'>
                    <TypewriterLabel label="Update Password? " />

                    <br />  <br />
                    <InputField
                        type={InputType.TEXT}
                        name="otp"
                        placeholder="*  otp"
                        onChangeHandler={inputChangeHandler}
                        validators={[ValidateInput.required]}
                        errorMsg={error["otp"]}
                        value={formValues["otp"]}
                        maxLength="6"
                    />
                    <InputField
                        type={togglePasswordVisibility ? InputType.PASSWORD : InputType.TEXT}
                        name="updatedPassword"
                        value={formValues["updatedPassword"]}
                        placeholder="* New Password"
                        onChangeHandler={inputChangeHandler}
                        trailingIcon={togglePasswordVisibility ? <PasswordIconAiFillEyeInvisible /> : <PasswordIconAiFillEye />}
                        onIconToggleHandler={onTogglePassword}
                        validators={[ValidateInput.required, ValidateInput.password]}
                        errorMsg={error["updatedPassword"]}
                    />

                    <br />
                    <Button
                        label="Update Password"
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
                    />
                    {toastComponent && toastComponent}
                </div>
            </center>
        </div>
    )
}

export default UpdatePasswordScreen