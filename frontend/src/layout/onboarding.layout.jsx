import { Outlet } from "react-router-dom";

const OnboardingLayout = ({ children }) => {
	return (
		<div className='h-screen flex items-center'>
			<div className='flex w-99% justify-between m-auto h-98% '>
				<div className='w-40%  rounded-2xl'>
					<Outlet />
				</div>
				<div
					className='flex-1 w-65% rounded-2xl drop-shadow-xl bg-no-repeat bg-origin-padding bg-cover '
					style={{
						backgroundImage:
							"url(https://res.cloudinary.com/dtjqyp0r2/image/upload/v1690747768/pexels-vini%CC%81cius-vieira-ft-4424355_efe28s.jpg)",
					}}>
					<div className='absolute right-10 top-5 bg-white cursor-pointer rounded-3xl py-3 px-6 tracking ease-out duration-300 hover:tracking-wide '>
						<h1 className='text-fontsize-brittle font-medium '>Sign up</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnboardingLayout;
