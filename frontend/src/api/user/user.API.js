import {
	APIType,
	MethodType,
	NetworkInfo,
	UserType,
} from "@Constants/network.js";

import { errorDebug } from "@Shared/utils/error.utils.js";
import { BreezeHttpService } from "@Shared/services/http.service.js";
import { BreezeSessionManagement } from "@/shared/services/sessionManagement.service";

export const userAPI = {
	login: async function (userData) {
		let httpCall = new BreezeHttpService();
		httpCall.dataToSend = userData;
		httpCall.URL =
			NetworkInfo.networkInfo + APIType.USER + MethodType.POST + UserType.LOGIN;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "userAPI.login()");
		}
	},
	signup: async function (userData) {
		let httpCall = new BreezeHttpService();
		httpCall.dataToSend = userData;
		httpCall.setAuthRequired = false;
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.USER +
			MethodType.POST +
			UserType.SIGNUP;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "userAPI.signup()");
		}
	},
	forgotPassword: async function (userData) {
		let httpCall = new BreezeHttpService();
		httpCall.dataToSend = userData;
		httpCall.setAuthRequired = false;
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.USER +
			MethodType.POST +
			UserType.FORGOTPASSWORD;
		try {
			let response = await BreezeHttpService.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "userAPI.forgotpassword()");
		}
	},
	updatePassword: async function (userData) {
		let httpCall = new BreezeHttpService();
		httpCall.dataToSend = userData;
		httpCall.setAuthRequired = false;
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.USER +
			MethodType.POST +
			UserType.UPDATEPASSWORD;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "userAPI.updatePassword()");
		}
	},
	getAllUsers: async function () {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.USER +
			MethodType.GET +
			UserType.GET_ALL_USERS;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		try {
			let response = await httpCall.sendGetRequest();

			return response;
		} catch (error) {
			return errorDebug(error, "userAPI.getAllUsers()");
		}
	},
};
