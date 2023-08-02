import BreezeSidebar from "@Components/breezeSidebar/breezeSidebar.components";
import { Outlet } from "react-router-dom";

const PostOnboardingLayout = () => {
	return (
		<div className='h-screen w-screen bg-gray-100 flex items-start justify-start '>
			<BreezeSidebar />
			<div className='flex-1 m-auto '>
				<div className='mx-auto'>
					<Outlet />
				</div>
				{/* <h1 className='hover:tracking-wider ease-linear duration-300  cursor-pointer  mx-auto text-sm text-center  text-color-darkTeal font-bold text-fontsize-pearl first-letter:text-lg'>
					Breeze.io
				</h1> */}
			</div>
		</div>
	);
};

export default PostOnboardingLayout;
