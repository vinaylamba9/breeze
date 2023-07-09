import { ChatAPI } from "@API/chat/chat.API";
import { HTTPStatusCode } from "@Constants/network";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const ChatDAO = {
	createChatDAO: async function (userDetails) {
		try {
			const createChatResponse = await ChatAPI.createChat(userDetails);
			if (createChatResponse) {
				const statusCode = createChatResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = createChatResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return createChatResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return createChatResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.createChatDAO()");
		}
	},
	fetchChatDAO: async function (userDetails) {
		try {
			const fetchChatResponse = await ChatAPI.fetchChat(userDetails);
			if (fetchChatResponse) {
				const statusCode = fetchChatResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = fetchChatResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return fetchChatResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return fetchChatResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.fetchChatDAO()");
		}
	},
	createGroupChatDAO: async function (groupChatDetails) {
		try {
			const createGroupChatResponse = await ChatAPI.createGroupChat(
				groupChatDetails
			);
			if (createGroupChatResponse) {
				const statusCode = createGroupChatResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = createGroupChatResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return createGroupChatResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return createGroupChatResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.createGroupChatDAO()");
		}
	},
};
