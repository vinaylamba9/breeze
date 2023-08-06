import { BreezeSessionManagement } from "@/shared/services/sessionManagement.service";
import { io } from "socket.io-client";

const URL = process.env.REACT_SOCKET_ENDPOINT;

export const socket = io(URL, {
	query: {
		token: BreezeSessionManagement.getAPIKey(),
	},
});
