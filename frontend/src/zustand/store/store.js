import useToggleSidebarSlice from "@Zustand/slice/useToggleSidebar.js";
import { create } from "zustand";
import useProfileSidebar from "@Zustand/slice/useProfileSidebar";
import useSelectUserFromGroup from "@Zustand/slice/useSelectUserFromGroup";

const useCombinedStore = create((...set) => ({
	...useToggleSidebarSlice(...set),
	...useProfileSidebar(...set),
	...useSelectUserFromGroup(...set),
}));

export default useCombinedStore;
