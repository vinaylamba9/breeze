import useToggleSidebarSlice from "@Zustand/slice/useToggleSidebar.js";
import { create } from "zustand";

const useCombinedStore = create((...set) => ({
	...useToggleSidebarSlice(...set),
}));

export default useCombinedStore;
