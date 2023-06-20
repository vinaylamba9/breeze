import { SessionType } from "constants/application";
import { errorDebug } from "utils/errorUtils";
import { SecureStorageUtils } from "utils/secureStorageUtils";

export const UserSessionManagementController = {
	/**
	 * @Function setUserSession()
	 * @params {*} userAccount
	 * @returns Write data in Secured Storage
	 */
	setUserSession: function (userAccount) {
		try {
			SecureStorageUtils.writeSecuredData({
				key: "userSessionInfo",
				value: JSON.stringify(userAccount),
			});
		} catch (error) {
			return errorDebug(
				error,
				"UserSessionManagementController.setUserSession"
			);
		}
	},

	/**
	 * @Function getUserSession()
	 * @returns SecuredStorage data
	 */
	getUserSession: function () {
		try {
			const data = SecureStorageUtils.readSecuredData("userSessionInfo");
			return data && data;
		} catch (error) {
			return errorDebug(
				error,
				"UserSessionManagementController.getUserSession"
			);
		}
	},

	/**
	 * @Function deleteUserSession()
	 * @returns isSessionDeleted\
	 * @returnType bool
	 */
	deleteUserSession: function () {
		try {
			const isUserSessionDeleted =
				SecureStorageUtils.deleteSecuredData("userSessionInfo");
			if (isUserSessionDeleted) this.setSessionStatus(SessionType.EXPIRED);
			return isUserSessionDeleted;
		} catch (error) {
			errorDebug(error, "UserSessionManagementController.deleteUserSession");
			return false;
		}
	},

	/**
	 * @Function setSessionStatus
	 * @param {*} sessionStatus
	 * @returns Write sessionStatus in Secured Storage
	 */
	setSessionStatus: function (sessionStatus) {
		try {
			SecureStorageUtils.writeSecuredData({
				key: "sessionStatus",
				value: sessionStatus,
			});
		} catch (error) {
			return errorDebug(
				error,
				"UserSessionManagementController.setSessionStatus"
			);
		}
	},

	/**
	 * @Function getSessionStatus()
	 * @returns sessionStatusData
	 */
	getSessionStatus: function () {
		try {
			const data = SecureStorageUtils.readSecuredData("sessionStatus");
			return data && data;
		} catch (error) {
			return errorDebug(
				error,
				"UserSessionManagementController.getSessionStatus"
			);
		}
	},

	/**
	 * @Function setAPIKey()
	 * @param {*} accessKey
	 * @returns Write apiKey data in secured storage
	 */
	setAPIKey: function (accessKey) {
		try {
			SecureStorageUtils.writeSecuredData({
				key: "apiKey",
				value: accessKey,
			});
		} catch (error) {
			return errorDebug(error, "UserSessionManagementController.setAPIKey");
		}
	},

	/**
	 * @Function getAPIKey()
	 * @returns apiKey securedStorage Data
	 */
	getAPIKey: function () {
		try {
			const data = SecureStorageUtils.readSecuredData("apiKey");
			console.log("---data", data);
			return data && data;
		} catch (error) {
			return errorDebug(error, "UserSessionManagementController.getAPIKey");
		}
	},
};
