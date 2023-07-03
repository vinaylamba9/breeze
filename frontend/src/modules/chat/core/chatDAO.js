import { ChatAPI } from "@API/chat/chat.API";
import { HTTPStatusCode } from "@Constants/network";
import BreezeRoutes from "@Constants/routes";
import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { errorDebug } from "@Shared/utils/error.utils";

export const ChatDAO = {
	getAllUsersDAO: async function () {
		try {
			const allUserResponse = await ChatAPI.getAllUsers();
			console.log(allUserResponse, "-allUserResponse");
			if (allUserResponse) {
				const statusCode = allUserResponse["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = allUserResponse.responseBody?.data;
					return {
						statusCode: statusCode,
						responseBody: tempResult,
					};
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return allUserResponse;
				} else if (
					statusCode === HTTPStatusCode.BAD_REQUEST ||
					statusCode === HTTPStatusCode.INTERNAL_SERVER_ERROR
				)
					return allUserResponse;
				else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					console.log(statusCode, "--statusCode");
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					console.log(deletedResponse, "-deletedReposne");
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				}
				return statusCode;
			}
		} catch (error) {
			return errorDebug(error, "ChatDAO.getAllUsersDAO()");
		}
	},
};
