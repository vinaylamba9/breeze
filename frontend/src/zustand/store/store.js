import useToggleSidebarSlice from "@Zustand/slice/useToggleSidebar.js";
import { create } from "zustand";
import useProfileSidebar from "@Zustand/slice/useProfileSidebar";
import useSelectUserFromGroup from "@Zustand/slice/useSelectUserFromGroup";
import useLoggedInUser from "@Zustand/slice/useLoggedInUser";
import useChat from "@Zustand/slice/useChatList";

const useCombinedStore = create((...set) => ({
	...useToggleSidebarSlice(...set),
	...useProfileSidebar(...set),
	...useSelectUserFromGroup(...set),
	...useLoggedInUser(...set),
	...useChat(...set),
}));

export default useCombinedStore;
