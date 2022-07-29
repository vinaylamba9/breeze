import { useRef } from 'react'
import Button from '../../components/button/button';
import InputField from '../../components/inputField/inputField';
import ToggleOnBoard from '../../components/toggleOnboard/toggleOnBoard'
import Routes from "../../constants/routes";


const LoginScreen = () => {
    const userLoginInfo = useRef({
        "username": "",
    })

    return (
        <div>
            <ToggleOnBoard label='New to Breeze?' linkLabel='Signup' link={Routes.SIGNUPROUTE} />
            <Button
                backgroundColor={`var(--color-darkTeal)`}
                textColor={`var(--text-color-purity)`}
                label="Get Started"
                onClickHandler={() => console.log("clicked")}
            />
            <InputField
                type="text"
                name="username"
                value=''
                placeholder="username"
                onChangeHandler={null}
                // validators={[ValidateInput.required, ValidateInput.username]}
                errorMsg="error"
            />
        </div>
    )
}

export default LoginScreen