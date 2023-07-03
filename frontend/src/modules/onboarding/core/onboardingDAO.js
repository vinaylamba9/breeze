import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service.js";
import { userAPI } from "@API/user/user.API.js";
import { AccountVerified, SessionType } from "@Constants/application.js";
import { HTTPStatusCode } from "@Constants/network.js";
import UserAccountModel from "@Models/userAccount.model.js";
import { errorDebug } from "@Shared/utils/error.utils.js";
import BreezeRoutes from "@Constants/routes";

export const userDAO = {
	loginDAO: async function (userData) {
		try {
			const loginResult = await userAPI.login(userData);

			if (loginResult) {
				const statusCode = loginResult["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					const tempResult = loginResult.responseBody;

					let _userAccount = new UserAccountModel({
						userId: tempResult?.data?._id,
						name: tempResult?.data?.name,
						email: tempResult?.data?.email,
						profileImage: tempResult?.data?.profileImage,
						isVerified: tempResult?.data?.isVerified,
						accountInItFrom: tempResult?.data?.accountInItFrom,
						accountStatus: tempResult?.data?.accountStatus,
						token: tempResult?.data?.token,
					});

					if (_userAccount.isVerified === AccountVerified.NOT_VERIFIED) {
						return {
							statusCode: HTTPStatusCode.UNAUTHORIZED,
							responseBody: "User is not verified.",
						};
						//TODO:- Redirect to OTP Screen
					} else {
						await BreezeSessionManagement.setUserSession(
							JSON.stringify(_userAccount.toJSON())
						);
						await BreezeSessionManagement.setSessionStatus(SessionType.ACTIVE);
						await BreezeSessionManagement.setAPIKey(_userAccount["token"]);
						return {
							statusCode: statusCode,
							responseBody: _userAccount,
						};
					}
				} else if (statusCode === HTTPStatusCode.UNAUTHORIZED) {
					let deletedResponse = BreezeSessionManagement.deleteAllSession();
					if (deletedResponse) window.location.replace(BreezeRoutes.LOGINROUTE);
				} else if (statusCode === HTTPStatusCode.NOT_FOUND) {
					return loginResult;
				} else if (statusCode === HTTPStatusCode.BAD_REQUEST) {
					return loginResult;
				}
			}
		} catch (error) {
			return errorDebug(error, "userDAO.loginDAO");
		}
	},
	signupDAO: async function (userData) {
		try {
			const signupResult = await userAPI.signup(userData);
			if (signupResult) {
				const statusCode = signupResult["statusCode"];
				if (statusCode === HTTPStatusCode.CREATED) {
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return signupResult;
				}
			}
			return signupResult;
		} catch (error) {
			return errorDebug(error, "userDAO.signupDAO");
		}
	},
	forgotPasswordDAO: async function (userData) {
		try {
			const forgotPasswordResult = await userAPI.forgotPassword(userData);
			if (forgotPasswordResult) {
				const statusCode = forgotPasswordResult["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					return {
						statusCode: statusCode,
						responseBody: forgotPasswordResult.responseBody.data,
					};
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return forgotPasswordResult;
				} else if (statusCode === HTTPStatusCode.BAD_REQUEST) {
					return forgotPasswordResult;
				}
			}
		} catch (error) {
			return errorDebug(error, "userDAO.forgotPasswordDAO");
		}
	},
	updatePasswordDAO: async function (userData) {
		try {
			const updatePasswordResult = await userAPI.updatePassword(userData);
			if (updatePasswordResult) {
				const statusCode = updatePasswordResult["statusCode"];
				if (statusCode === HTTPStatusCode.OK) {
					return {
						statusCode: statusCode,
						responseBody: updatePasswordResult.responseBody.data,
					};
				} else if (statusCode === HTTPStatusCode.FORBIDDEN) {
					return updatePasswordResult;
				} else if (statusCode === HTTPStatusCode.BAD_REQUEST) {
					return updatePasswordResult;
				}
			}
		} catch (error) {
			return errorDebug(error, "userDAO.updatePasswordDAO");
		}
	},
	logoutDAO: async function () {
		try {
			let response = BreezeSessionManagement.deleteAllSession();
			return response && response;
		} catch (error) {
			return errorDebug(error, "UserDAO.logoutDAO");
		}
	},
};
