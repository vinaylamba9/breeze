import { APIType, MethodType, NetworkInfo, UserAPI } from "constants/network";
import { errorDebug } from "utils/errorUtils";
import { HttpCall } from "utils/httpCall";

export const userAPI = {
    login: async function (userData) {
        let httpCall = new HttpCall();
        httpCall.dataToSend = userData;
        httpCall.setAuthRequired = false;
        httpCall.URL = NetworkInfo.networkInfo + APIType.USER + MethodType.POST + UserAPI.LOGIN;
        try {
            let response = await httpCall.sendPostRequest();
            return response;
        } catch (error) {
            return errorDebug(error, "userAPI.login()")
        }
    },
    signup: async function () {

    }
}