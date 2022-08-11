import { userAPI } from "apis/user/userAPI"
import { AccountVerified, SessionType } from "constants/application";
import { HTTPStatusCode } from "constants/network";
import { UserSessionManagementController } from "core/sessionManagement/userSessionManagementController";
import UserAccountModel from "models/userAccountModels";
import { errorDebug } from "utils/errorUtils";

export const userDAO = {
    loginDAO: async function (userData) {
        try {
            const loginResult = await userAPI.login(userData);
            if (loginResult) {
                const statusCode = loginResult['statusCode'];
                if (statusCode === HTTPStatusCode.OK) {
                    const tempResult = loginResult.responseBody;
                    let _userAccount = new UserAccountModel(tempResult.data)
                    await UserSessionManagementController.setUserSession(_userAccount)
                    await UserSessionManagementController.setSessionStatus(SessionType.ACTIVE)
                    await UserSessionManagementController.setAPIKey(_userAccount['token'])
                    if (_userAccount.isVerified == AccountVerified.NOT_VERIFIED) {
                        return {
                            "statusCode": HTTPStatusCode.UNAUTHORIZED,
                            "responseBody": "User is not verified."
                        }
                        //TODO:- Redirect to OTP Screen
                    }
                    return _userAccount
                } else if (statusCode === HTTPStatusCode.NOT_FOUND) {
                    return loginResult
                }
            }
        } catch (error) {
            return errorDebug(error, 'userDAO.loginDAO')
        }
    },
    signupDAO: async function (userData) {
        try {
            const signupResult = await userAPI.signup(userData)
            if (signupResult) {
                const statusCode = signupResult['statusCode'];
                if (statusCode === HTTPStatusCode.CREATED) {

                } else if (statusCode === HTTPStatusCode.FORBIDDEN) {
                    return signupResult
                }
            }

            return signupResult
        } catch (error) {
            return errorDebug(error, 'userDAO.signupDAO')
        }
    }

}