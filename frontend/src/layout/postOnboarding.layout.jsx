import { Outlet } from "react-router-dom";

const PostOnboardingLayout = () => {
	return (
		<div className='h-screen flex flex-col bg-color-slate '>
			<div className='w-90% mx-auto my-5'>
				<h1 className='w-95% mx-auto mt-1 text-3xl text-color-darkTeal font-bold text-fontsize-pearl first-letter:text-4xl'>
					Breeze
				</h1>
				<div className='w-95% mx-auto mt-2 '>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PostOnboardingLayout;
