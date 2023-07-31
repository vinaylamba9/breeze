import { Outlet } from "react-router-dom";

const OnboardingLayout = ({ children }) => {
	return (
		<div className='h-screen flex items-center'>
			<div className='flex w-99% justify-between m-auto h-98% '>
				<div className='w-40% overflow-y-auto rounded-2xl'>
					<Outlet />
				</div>
				<div
					className='flex-1 w-65% rounded-2xl  bg-no-repeat bg-origin-content bg-cover bg-bottom'
					style={{
						backgroundImage:
							"url(https://res.cloudinary.com/dtjqyp0r2/image/upload/v1690787526/li-zhang-xRRQlR8Qu-Y-unsplash_ufpdzj.jpg)",
					}}>
					{/* <div className='absolute  right-10 top-5 bg-white  cursor-pointer rounded-3xl py-3 px-8 tracking ease-out duration-300 hover:tracking-wide '>
						<h1 className=' text-fontsize-brittle font-medium text-black'>
							Signup
						</h1>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default OnboardingLayout;
