import { errorDebug } from "@Shared/utils/error.utils.js";

export const BreezeStorageService = {
	readSecuredData: async function (key) {
		try {
			const result = await localStorage.getItem(key);
			return result;
		} catch (error) {
			return errorDebug(error, "BreezeStorageService.readSecuredData");
		}
	},
	writeSecuredData: async function (securedData) {
		try {
			await localStorage.setItem(securedData.key, securedData.value);
		} catch (error) {
			return errorDebug(error, "BreezeStorageService.writeSecuredData");
		}
	},
	deleteSecuredData: async function (key) {
		try {
			await localStorage.removeItem(key);
			return true;
		} catch (error) {
			errorDebug(error, "BreezeStorageService.deleteSecuredData");
			return false;
		}
	},
	deleteAllSecuredData: async function () {
		try {
			await localStorage.clear();
			return true;
		} catch (error) {
			errorDebug(error, "BreezeStorageService.deleteAllSecureData");
			return false;
		}
	},
};
