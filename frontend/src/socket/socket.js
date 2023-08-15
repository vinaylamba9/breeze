import { BreezeSessionManagement } from "@Shared/services/sessionManagement.service";
import { io } from "socket.io-client";

const URL = process.env.REACT_SOCKET_ENDPOINT;

export const socket = io(URL, {
	autoConnect: true,
	forceBase64: true,
	// query: {
	// 	token: BreezeSessionManagement.getAPIKey(),
	// },
	extraHeaders: {
		Authorization: BreezeSessionManagement.getAPIKey(),
	},
	forceNew: true,
	reconnection: true,
	reconnectionAttempts: Infinity,
	reconnectionDelay: 10000, // defaults to 1000
	reconnectionDelayMax: 10000, // defaults to 5000
});
