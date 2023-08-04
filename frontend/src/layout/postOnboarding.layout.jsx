import BreezeSidebar from "@Components/breezeSidebar/breezeSidebar.components";
import { Outlet } from "react-router-dom";

const PostOnboardingLayout = () => {
	return (
		<div className='h-screen w-screen bg-gray-100 overflow-x-hidden flex items-start justify-start '>
			<BreezeSidebar />
			<div className='flex-1 '>
				<Outlet />
			</div>
		</div>
	);
};

export default PostOnboardingLayout;
