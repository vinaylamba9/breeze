import { errorDebug } from "./errorUtils"
import secureLocalStorage from "react-secure-storage";


export const SecureStorageUtils = {
    readSecuredData: async function (key) {
        try {
            return key && secureLocalStorage.getItem(key)
        } catch (error) {
            return errorDebug(error, "secureStorageUtils.readSecuredData")
        }
    },
    writeSecuredData: async function (securedData) {
        try {
            secureLocalStorage.setItem(securedData.key, securedData.data)
        } catch (error) {
            return errorDebug(error, "secureStorageUtils.writeSecuredData")
        }
    },
    deleteSecuredData: async function (key) {
        try {
            secureLocalStorage.removeItem(key)
        } catch (error) {
            return errorDebug(error, "secureStorageUtils.deleteSecuredData")
        }
    },
    deleteAllSecuredData: async function () {
        try {
            secureLocalStorage.clear();
        } catch (error) {
            return errorDebug(error, "secureStorageUtils.deleteAllSecureData")
        }
    }
}