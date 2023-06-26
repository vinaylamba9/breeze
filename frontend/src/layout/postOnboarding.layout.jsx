import { Outlet } from "react-router-dom";

const PostOnboardingLayout = () => {
	return (
		<div className='h-screen bg-[color:var(--color-pearl)] flex'>
			<div
				style={{
					boxShadow:
						"0 3px 6px rgba(0,0,0,0.0006), 0 3px 6px rgba(0,0,0,0.103)",
				}}
				className='w-90% mx-auto my-5 bg-[color:var(--color-TealWithOpacity)] rounded-lg'>
				<h1 className='w-95% mx-auto mt-2% text-2xl text-color-darkTeal font-bold text-fontsize-pearl first-letter:text-3xl'>
					Breeze
				</h1>
				<div className='w-95% mx-auto mt-2%'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PostOnboardingLayout;
