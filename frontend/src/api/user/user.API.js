import {
	APIType,
	MethodType,
	NetworkInfo,
	UserAPI,
} from "@Constants/network.js";

import { errorDebug } from "@Shared/utils/error.utils.js";
import { BreezeHttpService } from "@Shared/services/http.service.js";

export const userAPI = {
	login: async function (userData) {
		let httpCall = new BreezeHttpService();
		httpCall.dataToSend = userData;
		httpCall.URL =
			NetworkInfo.networkInfo + APIType.USER + MethodType.POST + UserAPI.LOGIN;
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
			NetworkInfo.networkInfo + APIType.USER + MethodType.POST + UserAPI.SIGNUP;
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
			UserAPI.FORGOTPASSWORD;
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
			UserAPI.UPDATEPASSWORD;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "userAPI.updatePassword()");
		}
	},
};
