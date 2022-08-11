import { userAPI } from "apis/user/userAPI"
import { SessionType } from "constants/application";
import { HTTPStatusCode } from "constants/network";
import { UserSessionManagementController } from "core/sessionManagement/userSessionManagementController";
import { errorDebug } from "utils/errorUtils";

export const userDAO = {
    loginDAO: async function (userData) {
        try {
            const loginResult = await userAPI.login(userData);
            if (loginResult) {
                const statusCode = loginResult['statusCode'];
                if (statusCode === HTTPStatusCode.OK) {
                    let tempResult = loginResult.responseBody;
                    tempResult = tempResult.data
                    await UserSessionManagementController.setUserSession(tempResult)
                    await UserSessionManagementController.setSessionStatus(SessionType.ACTIVE)
                    await UserSessionManagementController.setAPIKey(tempResult['token'])
                    return tempResult
                } else if (statusCode === HTTPStatusCode.NOT_FOUND) {
                    return loginResult
                }
            }
        } catch (error) {
            return errorDebug(error, 'userDAO.loginDAO')
        }
    },
    signupDAO: async function () {
        try {

        } catch (error) {
            return errorDebug(error, 'userDAO.signupDAO')
        }
    }

}