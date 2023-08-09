import BreezeProfile from "@Components/breezeProfile/breezeProfile.components";
import BreezeGroupProfile from "@Components/breezeGroupProfile/breezeGroupProfile.components";
import SelectUserFromGroupProvider from "@Context/selectUserFromGroupProvider";
import { useChatState } from "@Context/chatProvider";
import useCombinedStore from "@Zustand/store/store";
import BreezeSelfProfile from "@Components/breezeSelfProfile/breezeSelfProfile.components";
const BreezeInDisplaySidebar = ({
	isSelectedChatProfile,
	setSelectedChatProfile,
	fetchAgain,
	setFetchAgain,
}) => {
	const { selectedChat } = useChatState();
	const { isProfile, showProfile } = useCombinedStore((state) => ({
		isProfile: state?.isProfile,
		showProfile: state?.showProfile,
	}));
	return (
		<aside>
			<SelectUserFromGroupProvider>
				{isProfile ? (
					<BreezeSelfProfile
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
						// onClose={() => setProfile(false)}
					/>
				) : selectedChat?.isGroupChat ? (
					<BreezeGroupProfile
						onClose={() => setSelectedChatProfile(false)}
						setSelectedChatProfile={setSelectedChatProfile}
						fetchAgain={fetchAgain}
						setFetchAgain={setFetchAgain}
					/>
				) : (
					<BreezeProfile onClose={() => setSelectedChatProfile(false)} />
				)}
			</SelectUserFromGroupProvider>
		</aside>
	);
};

export default BreezeInDisplaySidebar;
