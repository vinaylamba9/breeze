export const CHAT_UTILS = {
	getOtherSideUserName: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.name
			: users?.[0]?.name,
	getOtherSideProfileImage: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.profileImage
			: users?.[0]?.profileImage,
};
