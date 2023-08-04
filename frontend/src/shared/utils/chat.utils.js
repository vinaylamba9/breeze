export const CHAT_UTILS = {
	getOtherSideUserName: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.name
			: users?.[0]?.name,
	getOtherSideProfileImage: (loggedInUser, users) => {
		if (users?.length > 0)
			return users?.[0]?._id === loggedInUser?.userId
				? users?.[1]?.profileImage
				: users?.[0]?.profileImage;
		else return users;
	},
	getOtherSideProfileEmail: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.email
			: users?.[0]?.email,
	getOtherSideProfileBio: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.bio
			: users?.[0]?.bio,
	isSameSenderOfMsg: (messages, m, i, userID) => {
		return (
			i < messages?.length - 1 &&
			(messages?.[i + 1]?.sender?._id !== m?.sender?._id ||
				messages?.[i + 1]?.sender?._id === undefined) &&
			messages?.[i]?.sender?._id !== userID
		);
	},
	isLastMessages: (messages, i, userID) => {
		return (
			i === messages?.length - 1 &&
			messages?.[messages?.length - 1]?.sender?._id !== userID &&
			messages?.[messages?.length - 1]?.sender?._id
		);
	},
	msgMargin: (messages, m, i, userId) => {
		if (
			i < messages?.length - 1 &&
			messages?.[i + 1]?.sender?._id === m?.sender?._id &&
			messages?.[i].sender?._id !== userId
		) {
			if (m?.chat?.isGroupChat) return 44;
			else return 0;
		} else if (
			(i < messages?.length - 1 &&
				messages?.[i + 1]?.sender?._id !== m?.sender?._id &&
				messages?.[i]?.sender?._id !== userId) ||
			(i === messages?.length - 1 && messages?.[i]?.sender?._id !== userId)
		)
			return 0;
		else return "auto";
	},
	isSameUser: (messages, m, i) => {
		return i > 0 && messages?.[i - 1]?.sender?._id === m?.sender?._id;
	},
};
