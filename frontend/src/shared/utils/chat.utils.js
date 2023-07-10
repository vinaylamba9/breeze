export const CHAT_UTILS = {
	getOtherSideUserName: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.name
			: users?.[0]?.name,
	getOtherSideProfileImage: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.profileImage
			: users?.[0]?.profileImage,
	getOtherSideProfileEmail: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.email
			: users?.[0]?.email,
	getOtherSideProfileBio: (loggedInUser, users) =>
		users?.[0]?._id === loggedInUser?.userId
			? users?.[1]?.bio
			: users?.[0]?.bio,
};
