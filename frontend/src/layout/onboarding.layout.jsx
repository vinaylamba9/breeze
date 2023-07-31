import { Outlet, useLocation } from "react-router-dom";

const OnboardingLayout = ({ children }) => {
	const location = useLocation();
	console.log(location, "-location");
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
					}}></div>
			</div>
		</div>
	);
};

export default OnboardingLayout;
