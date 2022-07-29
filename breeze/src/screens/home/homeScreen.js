import { useLocation } from "react-router-dom"
import Routes from "../../constants/routes";
import LoginScreen from "../login/loginScreen";
import OTPScreen from "../otp/otpScreen";
import SignupScreen from "../signup/signupScreen";

const HomeScreen = () => {
    const location = useLocation();

    return (
        <div className="h-screen w-full flex self-center ">
            <div className="w-6/12 bg-[color:var(--color-champagne)] flex" >
                <span className="h-full w-screen bg-no-repeat bg-80% bg-center bg-hero-image">
                    <h1 className="ml-10 mt-5 text-2xl text-background-color-dark font-bold tracking-normal first-letter:text-3xl">
                        Breeze
                    </h1>
                </span>
            </div>
            <div className="w-6/12" >
                {
                    location.pathname === Routes.SIGNUPROUTE ?
                        <SignupScreen /> :
                        location.pathname === Routes.OTPVERIFICATION ?
                            <OTPScreen /> :
                            <LoginScreen />
                }
            </div>
        </div>
    )
}

export default HomeScreen