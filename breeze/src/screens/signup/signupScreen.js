import { useRef } from 'react'
import Button from 'components/button/button';
import InputField from 'components/inputField/inputField';
import ToggleOnBoard from 'components/toggleOnboard/toggleOnBoard'
import Routes from "constants/routes";
import useIconToggle from "hooks/useIconToggle";
import { PasswordIconAiFillEye, PasswordIconAiFillEyeInvisible } from 'utils/utilsIcon';
import { ValidateInput } from 'constants/inputValidators';
import useForm from 'hooks/useForm';
import TypewriterLabel from 'components/typewriterLabel/typewriterLabel';
import GoogleIcon from "assets/images/google.png";
import { InputType } from 'constants/application';
import Toast from 'components/toast/toast';


const SignupScreen = () => {
    const [togglePasswordVisibility, onTogglePassword] = useIconToggle();

    const userSignupInfo = useRef({
        "name": "",
        "email": "",
        "password": ""
    });

    const { inputChangeHandler, formValues, error, onSubmitHandler } = useForm(userSignupInfo.current);
    return (
        <div className='flex flex-col animate-fadeIn'>
            <ToggleOnBoard label='Already a user? ' linkLabel='Login' link={Routes.LOGINROUTE} />
            <center>
                <div className=' flex flex-col text-fontsize-brittle '>
                    <TypewriterLabel label="Signup with " />
                    <div className='-mt-5% border '>
                        <InputField
                            type={InputType.TEXT}
                            name="name"
                            value={formValues["name"]}
                            placeholder="* Name"
                            onChangeHandler={inputChangeHandler}
                            validators={[ValidateInput.required]}
                            errorMsg={error["name"]}
                        />
                        <InputField
                            type={InputType.EMAIL}
                            name="email"
                            value={formValues["email"]}
                            placeholder="* Email"
                            onChangeHandler={inputChangeHandler}
                            validators={[ValidateInput.required, ValidateInput.email]}
                            errorMsg={error["email"]}
                        />
                        <InputField
                            type={togglePasswordVisibility ? InputType.PASSWORD : InputType.TEXT}
                            name="password"
                            value={formValues["password"]}
                            placeholder="* Password"
                            onChangeHandler={inputChangeHandler}
                            trailingIcon={togglePasswordVisibility ? <PasswordIconAiFillEyeInvisible /> : <PasswordIconAiFillEye />}
                            onIconToggleHandler={onTogglePassword}
                            validators={[ValidateInput.required, ValidateInput.password]}
                            errorMsg={error["password"]}
                        />
                        {/* <Toast backgroundColor={`var(--color-darkTeal)`} toastTitle="Image Uploaded." toastSubtitle="Hello, world!" toastIcon="" /> */}
                        <InputField
                            type={InputType.FILE}
                            name="profileImage"
                            value={formValues["profileImage"]}
                            placeholder="* Avatar"
                            onChangeHandler={inputChangeHandler}
                            validators={[ValidateInput.required]}
                            errorMsg={error["profileImage"]}
                        />
                        <Button
                            backgroundColor={`var(--color-darkTeal)`}
                            textColor={`var(--text-color-purity)`}
                            label="Get Set Breeze"
                            onClickHandler={() => console.log("clicked")}
                        />
                        <p>Or</p>
                        <Button
                            icon={GoogleIcon}
                            backgroundColor={`var(--text-color-purity)`}
                            textColor={`var(--text-color-dark)`}
                            label="Signup with Google"
                            onClickHandler={() => console.warn("Singup with google")}
                        />
                    </div>
                </div>
            </center >
        </div >
    )
}

export default SignupScreen