import useToggleSidebarSlice from "@Zustand/slice/useToggleSidebar.js";
import { create } from "zustand";
import useProfileSidebar from "@Zustand/slice/useProfileSidebar";
import useSelectUserFromGroup from "@Zustand/slice/useSelectUserFromGroup";
import useLoggedInUser from "@Zustand/slice/useLoggedInUser";
import useChat from "@Zustand/slice/useChatList";
import useSelectedChat from "@Zustand/slice/useSelectedChat";
import useNotification from "@Zustand/slice/useNotification";
import useNewMessage from "@Zustand/slice/useNewMessage";

const useCombinedStore = create((...set) => ({
	...useToggleSidebarSlice(...set),
	...useProfileSidebar(...set),
	...useSelectUserFromGroup(...set),
	...useLoggedInUser(...set),
	...useChat(...set),
	...useSelectedChat(...set),
	...useNotification(...set),
	...useNewMessage(...set),
}));

export default useCombinedStore;
