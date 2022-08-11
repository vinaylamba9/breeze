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
import { InputType } from 'constants/application';
import Toast from 'components/toast/toast';
import Spinner from 'components/spinner/spinner';
import axios from 'axios';
import FileUpload from 'components/fileUpload/fileUpload';


const SignupScreen = () => {
    const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
    const [isLoading, setIsLoading] = useState(false);
    const [toastComponent, setToastComponent] = useState("");

    const profileImageUpload = async (pics) => {
        setIsLoading(true);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", process.env.REACT_APP_NAME)
            data.append("cloud_name", process.env.REACT_APP_CLOUDNAME)
            const response = await axios.post(process.env.REACT_APP_APICLOUDINARYURL.toString(), data)
            setIsLoading(false);
            console.log(response)
            setToastComponent(<Toast statusCode={response.status} toastTitle="Avatar Upload" toastSubtitle={` Avatar uploaded successfully.`} autoDismissable />)
            return;
        }
        setIsLoading(false);
        setToastComponent(<Toast statusCode={Math.random()} toastTitle="Avatar Upload" toastSubtitle="Please choose proper format." autoDismissable />)
        return;
    }


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
                    <div className='-mt-2% '>
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
                        {!isLoading && toastComponent}

                        <FileUpload
                            type={InputType.FILE}
                            name="profileImage"
                            accept="image/x-png,image/gif,image/jpeg"
                            onChangeHandler={(e) => profileImageUpload(e.target.files[0])}
                        />

                        {
                            !isLoading ? <Button
                                backgroundColor={`var(--color-darkTeal)`}
                                textColor={`var(--text-color-purity)`}
                                label="Get Set Breeze"
                                onClickHandler={() => {
                                    onSubmitHandler()
                                    //TODO:- HANDLE LOGIN and SIGNUP
                                    console.log(formValues)
                                }}
                            /> : <Spinner />
                        }
                        <p>Or</p>
                        <Button
                            icon={GoogleIcon}
                            backgroundColor={`var(--text-color-purity)`}
                            textColor={`var(--text-color-dark)`}
                            label="Signup with Google"
                            onClickHandler={() => {
                                setToastComponent(<Toast statusCode={Math.random()} toastTitle="Signup with Google" toastSubtitle="* Features will be available soon." autoDismissable />)
                                return;
                            }}
                        />
                    </div>
                </div>
            </center >
        </div >
    )
}

export default SignupScreen