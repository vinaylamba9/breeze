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


const SignupScreen = () => {
    const [togglePasswordVisibility, onTogglePassword] = useIconToggle();
    const [isLoading, setIsLoading] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [toastComponent, setToastComponent] = useState("");

    const profileImageUpload = async (pics) => {
        setIsLoading(true);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", process.env.REACT_APP_NAME)
            data.append("cloud_name", process.env.REACT_APP_CLOUDNAME)
            const response = await axios.post(process.env.REACT_APP_APICLOUDINARYURL.toString(), data)
            console.log(response, '-----🍠 ----------');
            let result = response.data;
            setImageURL(result.url.toString());
            setIsLoading(false);
            setToastComponent(<Toast statusCode={response.status} toastTitle="Avatar Upload" toastSubtitle="Avatar uploaded successfully." dismissTime={5000} />)
        }
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
                    <div className='-mt-5% '>
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

                        {isLoading === false ? toastComponent : ""}

                        {
                            isLoading === false ?
                                <InputField
                                    type={InputType.FILE}
                                    name="profileImage"
                                    placeholder="* profileImage"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    onChangeHandler={(e) => profileImageUpload(e.target.files[0])}
                                />
                                : <Spinner />
                        }
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