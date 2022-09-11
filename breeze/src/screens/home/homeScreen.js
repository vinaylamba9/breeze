import UpdatePassword from "screens/updatePassword/updatePassword";
import { useLocation } from "react-router-dom"
import ForgotPasswordScreen from "screens/forgotPassword/forgotPassword";
import OTPScreen from "screens/otp/otpScreen";
import Routes from "../../constants/routes";
import LoginScreen from "../login/loginScreen";
import SignupScreen from "../signup/signupScreen";
import UpdatePasswordScreen from "screens/updatePassword/updatePassword";

const HomeScreen = () => {
    const location = useLocation();

    return (
        <div className="h-screen w-full flex self-center ">
            <div className="w-6/12 bg-[color:var(--color-champagne)] flex" >
                <span className="h-full w-screen bg-no-repeat bg-70% bg-center bg-hero-image">
                    <h1 className="ml-10% mt-5% text-2xl text-background-color-jade font-bold  text-fontsize-pearl first-letter:text-3xl">
                        Breeze
                    </h1>
                </span>
            </div>
            <div className="w-6/12" >
                {location.pathname === Routes.SIGNUPROUTE && <SignupScreen />}
                {location.pathname === Routes.LOGINROUTE && <LoginScreen />}
                {location.pathname === Routes.FORGOTPASSWORDROUTE && <ForgotPasswordScreen />}
                {location.pathname === Routes.OTPVERIFICATIONROUTE && <OTPScreen />}
                {location.pathname === Routes.UPDATEPASSWORDROUTE && <UpdatePasswordScreen />}
            </div>
        </div>
    )
}

export default HomeScreen