import { BreezeSessionManagement } from "@/shared/services/sessionManagement.service";
import { APIType, ChatType, MethodType, NetworkInfo } from "@Constants/network";
import { BreezeHttpService } from "@Shared/services/http.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const ChatAPI = {
	createChat: async function (userDetails) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.POST +
			ChatType.CREATE_CHAT;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = userDetails;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.createChat()");
		}
	},
	fetchChat: async function (userDetails) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.GET +
			ChatType.FETCH_CHAT;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = userDetails;
		try {
			let response = await httpCall.sendGetRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.createChat()");
		}
	},
	createGroupChat: async function (groupData) {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.CHAT +
			MethodType.POST +
			ChatType.CREATE_GROUP_CHAT;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();
		httpCall.dataToSend = groupData;
		try {
			let response = await httpCall.sendPostRequest();
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.createChat()");
		}
	},
};
