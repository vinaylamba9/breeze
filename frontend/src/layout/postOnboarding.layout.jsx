import useCombinedStore from "@Zustand/store/store";
import BreezeSidebar from "@Components/breezeSidebar/breezeSidebar.components";
import { Outlet } from "react-router-dom";
import useIsMobile from "@Shared/hooks/useMobile";

const PostOnboardingLayout = () => {
	const { isSideMenu } = useCombinedStore((state) => ({
		isSideMenu: state?.isSideMenu,
	}));
	const isMobile = useIsMobile();
	return (
		<div className=' w-screen  overflow-x-hidden flex items-start justify-start '>
			<div>
				{!isMobile ? <BreezeSidebar /> : isSideMenu ? <BreezeSidebar /> : null}
			</div>

			<div className='flex-1 h-full '>
				<Outlet />
			</div>
		</div>
	);
};

export default PostOnboardingLayout;
