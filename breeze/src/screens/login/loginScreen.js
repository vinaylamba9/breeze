import { useRef, useState } from 'react'
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
import Toast from 'components/toast/toast';
import { userAPI } from 'apis/user/userAPI';


const LoginScreen = () => {
    const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
    const [toastComponent, setToastComponent] = useState("");

    const userLoginInfo = useRef({
        "email": "",
        "password": ""
    });

    const { inputChangeHandler, formValues, error, onSubmitHandler } = useForm(userLoginInfo.current);
    return (
        <div className='flex flex-col animate-fadeIn'>
            <ToggleOnBoard label='New to Breeze? ' linkLabel='Signup' link={Routes.SIGNUPROUTE} />
            <center>
                <div className='mt-10% text-fontsize-brittle'>
                    <TypewriterLabel label="Log in with " />
                    <InputField
                        type="text"
                        name="email"
                        value={formValues["email"]}
                        placeholder="* Email"
                        onChangeHandler={inputChangeHandler}
                        validators={[ValidateInput.required, ValidateInput.email]}
                        errorMsg={error["email"]}
                    />
                    <InputField
                        type={togglePasswordVisibility ? "password" : "text"}
                        name="password"
                        value={formValues["password"]}
                        placeholder="* Password"
                        onChangeHandler={inputChangeHandler}
                        trailingIcon={togglePasswordVisibility ? <PasswordIconAiFillEyeInvisible /> : <PasswordIconAiFillEye />}
                        onIconToggleHandler={onTogglePassword}
                        validators={[ValidateInput.required, ValidateInput.password]}
                        errorMsg={error["password"]}
                    />
                    <div className="cursor-pointer text-fontsize-brittle font-medium opacity-80 text-color-darkTeal ml-40% mb-5%">
                        <p><b>* Forgot Password?</b> </p>
                    </div>
                    <Button
                        backgroundColor={`var(--color-darkTeal)`}
                        textColor={`var(--text-color-purity)`}
                        label="Get Started"
                        onClickHandler={console.log("worked")}
                    />
                    <p>Or</p>
                    <Button
                        icon={GoogleIcon}
                        backgroundColor={`var(--text-color-purity)`}
                        textColor={`var(--text-color-dark)`}
                        label="Log in with Google"
                        onClickHandler={() => setToastComponent(<Toast statusCode={Math.random()} toastTitle="Login with Google" toastSubtitle="* Features will be available soon." autoDismissable />)}
                    />
                    {toastComponent && toastComponent}
                </div>
            </center>
        </div>
    )
}

export default LoginScreen