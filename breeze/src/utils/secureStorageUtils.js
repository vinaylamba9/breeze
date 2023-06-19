import { errorDebug } from "./errorUtils";
// import secureLocalStorage from "react-secure-storage";

export const SecureStorageUtils = {
	readSecuredData: async function (key) {
		try {
			const result = await localStorage.getItem(key);
			return result;
		} catch (error) {
			return errorDebug(error, "secureStorageUtils.readSecuredData");
		}
	},
	writeSecuredData: async function (securedData) {
		try {
			await localStorage.setItem(securedData.key, securedData.value);
		} catch (error) {
			return errorDebug(error, "secureStorageUtils.writeSecuredData");
		}
	},
	deleteSecuredData: async function (key) {
		try {
			await localStorage.removeItem(key);
			return true;
		} catch (error) {
			errorDebug(error, "secureStorageUtils.deleteSecuredData");
			return false;
		}
	},
	deleteAllSecuredData: async function () {
		try {
			await localStorage.clear();
			return true;
		} catch (error) {
			errorDebug(error, "secureStorageUtils.deleteAllSecureData");
			return false;
		}
	},
};
