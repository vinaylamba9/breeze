import { useRef } from "react";
import InputField from "components/inputField/inputField"
import ToggleOnBoard from "components/toggleOnboard/toggleOnBoard"
import TypewriterLabel from "components/typewriterLabel/typewriterLabel"
import Routes from "constants/routes"
import Button from "components/button/button"
import { InputType } from "constants/application"
import useForm from "hooks/useForm";
import { ValidateInput } from "constants/inputValidators";


const EmailConfirm = () => {

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
                    <Button
                        label="Confirm with Breeze"
                        backgroundColor={`var(--color-darkTeal)`}
                        textColor={`var(--text-color-purity)`}
                        onClickHandler={() => onSubmitHandler()}
                    />
                </div>
            </center>
        </div>
    )
}

export default EmailConfirm