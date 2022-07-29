import React from 'react'
import ToggleOnBoard from '../../components/toggleOnboard/toggleOnBoard'
import Routes from "../../constants/routes";

const SignupScreen = () => {
    return (
        <div>
            <ToggleOnBoard label='Already a member?' linkLabel='Login' link={Routes.LOGINROUTE} />
        </div>
    )
}

export default SignupScreen