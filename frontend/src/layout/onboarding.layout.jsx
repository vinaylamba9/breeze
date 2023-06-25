import { Outlet } from "react-router-dom";

const OnboardingLayout = ({ children }) => {
	return (
		<div className='h-screen w-full flex self-center '>
			<div className='w-6/12 bg-[color:var(--color-champagne)] flex'>
				<span
					className='h-full w-screen bg-no-repeat bg-70% bg-center '
					style={{
						backgroundImage:
							"url('https://res.cloudinary.com/dtjqyp0r2/image/upload/v1660643211/bkisv2kflru4pcnp5alk.png')",
					}}>
					<h1 className='ml-10% mt-5% text-2xl text-color-darkTeal font-bold text-fontsize-pearl first-letter:text-3xl'>
						Breeze
					</h1>
				</span>
			</div>
			<div className='w-6/12'>
				<Outlet />
			</div>
		</div>
	);
};

export default OnboardingLayout;
