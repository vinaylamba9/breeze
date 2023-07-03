import { BreezeSessionManagement } from "@/shared/services/sessionManagement.service";
import { APIType, MethodType, NetworkInfo, UserAPI } from "@Constants/network";
import { BreezeHttpService } from "@Shared/services/http.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const ChatAPI = {
	getAllUsers: async function () {
		let httpCall = new BreezeHttpService();
		httpCall.URL =
			NetworkInfo.networkInfo +
			APIType.USER +
			MethodType.GET +
			UserAPI.GET_ALL_USERS;
		httpCall.setAuthRequired = true;
		httpCall.setAuthToken = BreezeSessionManagement.getAPIKey();

		try {
			let response = await httpCall.sendGetRequest();
			console.log(response, "-response");
			return response;
		} catch (error) {
			return errorDebug(error, "ChatAPI.getAllUsers()");
		}
	},
};
