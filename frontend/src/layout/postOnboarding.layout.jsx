import { Outlet } from "react-router-dom";

const PostOnboardingLayout = () => {
	return (
		<div className='h-screen  bg-color-slate '>
			<div className='w-90% mx-auto'>
				<h1 className=' text-3xl py-2 text-color-darkTeal font-bold text-fontsize-pearl first-letter:text-4xl'>
					Breeze
				</h1>
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
