import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { io } from "socket.io-client";

const URL = process.env.REACT_SOCKET_ENDPOINT;

export const socket = io(URL, {
	fontFamily: true,
	// query: {
	// 	token: BreezeSessionManagement.getAPIKey(),
	// },
	extraHeaders: {
		Authorization: BreezeSessionManagement.getAPIKey(),
	},
});
