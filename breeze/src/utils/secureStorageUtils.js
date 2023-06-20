import { errorDebug } from "./errorUtils";
// import secureLocalStorage from "react-secure-storage";

export const SecureStorageUtils = {
	readSecuredData: function (key) {
		try {
			const result = localStorage.getItem(key);
			return result;
		} catch (error) {
			return errorDebug(error, "secureStorageUtils.readSecuredData");
		}
	},
	writeSecuredData: function (securedData) {
		try {
			localStorage.setItem(securedData.key, securedData.value);
		} catch (error) {
			return errorDebug(error, "secureStorageUtils.writeSecuredData");
		}
	},
	deleteSecuredData: function (key) {
		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			errorDebug(error, "secureStorageUtils.deleteSecuredData");
			return false;
		}
	},
	deleteAllSecuredData: function () {
		try {
			localStorage.clear();
			return true;
		} catch (error) {
			errorDebug(error, "secureStorageUtils.deleteAllSecureData");
			return false;
		}
	},
};
