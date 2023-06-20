import { SessionType } from "@Constants/application.js";
import { errorDebug } from "@Shared/utils/error.utils.js";
import { BreezeStorageService } from "@Shared/services/secureStorage.service.js";
export const BreezeSessionManagement = {
	/**
	 * @Function setUserSession()
	 * @params {*} userAccount
	 * @returns Write data in Secured Storage
	 */
	setUserSession: async function (userAccount) {
		try {
			await BreezeStorageService.writeSecuredData({
				key: "userSessionInfo",
				value: userAccount,
			});
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.setUserSession");
		}
	},

	/**
	 * @Function getUserSession()
	 * @returns SecuredStorage data
	 */
	getUserSession: async function () {
		try {
			const data = await BreezeStorageService.readSecuredData(
				"userSessionInfo"
			);
			return data && data;
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.getUserSession");
		}
	},

	/**
	 * @Function deleteUserSession()
	 * @returns isSessionDeleted\
	 * @returnType bool
	 */
	deleteUserSession: async function () {
		try {
			const isUserSessionDeleted = await BreezeStorageService.deleteSecuredData(
				"userSessionInfo"
			);
			if (isUserSessionDeleted) this.setSessionStatus(SessionType.EXPIRED);
			return isUserSessionDeleted;
		} catch (error) {
			errorDebug(error, "BreezeSessionManagement.deleteUserSession");
			return false;
		}
	},

	/**
	 * @Function setSessionStatus
	 * @param {*} sessionStatus
	 * @returns Write sessionStatus in Secured Storage
	 */
	setSessionStatus: async function (sessionStatus) {
		try {
			await BreezeStorageService.writeSecuredData({
				key: "sessionStatus",
				value: sessionStatus,
			});
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.setSessionStatus");
		}
	},

	/**
	 * @Function getSessionStatus()
	 * @returns sessionStatusData
	 */
	getSessionStatus: async function () {
		try {
			const data = await BreezeStorageService.readSecuredData("sessionStatus");
			return data && data;
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.getSessionStatus");
		}
	},

	/**
	 * @Function setAPIKey()
	 * @param {*} accessKey
	 * @returns Write apiKey data in secured storage
	 */
	setAPIKey: async function (accessKey) {
		try {
			await BreezeStorageService.writeSecuredData({
				key: "apiKey",
				value: accessKey,
			});
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.setAPIKey");
		}
	},

	/**
	 * @Function getAPIKey()
	 * @returns apiKey securedStorage Data
	 */
	getAPIKey: async function () {
		try {
			const data = await BreezeStorageService.readSecuredData("apiKey");
			console.log("---data", data);
			return data && data;
		} catch (error) {
			return errorDebug(error, "BreezeSessionManagement.getAPIKey");
		}
	},
};
