import { SessionType } from "constants/application"
import { errorDebug } from "utils/errorUtils"
import { SecureStorageUtils } from "utils/secureStorageUtils"

export const UserSessionManagementController = {
    setUserSession: async function (userAccount) {
        try {
            await SecureStorageUtils.writeSecuredData(
                {
                    "key": "userSessionInfo",
                    'value': userAccount
                }
            )
        } catch (error) {
            return errorDebug(error, "UserSessionManagementController.setUserSession")
        }
    },
    getUserSession: async function () {
        try {
            const data = await SecureStorageUtils.readSecuredData("userSessionInfo");
            return data && data['userSessionInfo'];
        } catch (error) {
            return errorDebug(error, 'UserSessionManagementController.getUserSession');
        }
    },
    deleteUserSession: async function () {
        try {
            const isUserSessionDeleted = await SecureStorageUtils.deleteSecuredData('userSessionInfo');
            if (isUserSessionDeleted)
                this.setSessionStatus(SessionType.EXPIRED)
            return isUserSessionDeleted;
        } catch (error) {
            errorDebug(error, 'UserSessionManagementController.deleteUserSession');
            return false
        }
    },
    setSessionStatus: async function (sessionStatus) {
        try {
            await SecureStorageUtils.writeSecuredData({
                "key": "sessionStatus",
                "value": sessionStatus
            })
        } catch (error) {
            return errorDebug(error, 'UserSessionManagementController.setSessionStatus');
        }
    },
    getSessionStatus: async function () {
        try {
            const data = await SecureStorageUtils.readSecuredData("sessionStatus");
            return data && data;
        } catch (error) {
            return errorDebug(error, 'UserSessionManagementController.getSessionStatus');
        }
    },
    setAPIKey: async function (accessKey) {
        try {
            await SecureStorageUtils.writeSecuredData({
                "key": "apiKey",
                "value": accessKey
            })
        } catch (error) {
            return errorDebug(error, 'UserSessionManagementController.setAPIKey');
        }
    },
    getAPIKey: async function () {
        try {
            const data = await SecureStorageUtils.readSecuredData("apiKey")
            return data && data;
        } catch (error) {
            return errorDebug(error, 'UserSessionManagementController.getAPIKey');
        }
    }
}