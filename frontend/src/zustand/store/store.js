import useToggleSidebarSlice from "@Zustand/slice/useToggleSidebar.js";
import { create } from "zustand";
import useProfileSidebar from "@Zustand/slice/useProfileSidebar";

const useCombinedStore = create((...set) => ({
	...useToggleSidebarSlice(...set),
	...useProfileSidebar(...set),
}));

export default useCombinedStore;
