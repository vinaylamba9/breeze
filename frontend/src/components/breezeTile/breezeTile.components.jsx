import moment from "moment";
import { Fragment } from "react";

const BreezeTile = () => {
	return (
		<Fragment>
			<div
				className='flex my-3  
                    justify-start items-center bg-transparent '
				style={{ maxHeight: "80px", overflowY: "auto" }}>
				<div className=' m-auto w-95% flex items-center  '>
					<div
						className='flex w-90% items-center justify-start
                    gap-2 '>
						<div className='bg-straw-color rounded-full p-1'>
							<img
								src='https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801430/Zw_dxdyvy.png'
								alt='profile'
								className='rounded-full h-10 w-10 bg-no-repeat bg-center'
							/>
						</div>
						<div className=' flex flex-col w-60%'>
							<h3 className='truncate font-black text-sm '>John Doe</h3>
							<p className=' truncate text-fontsize-smart text-background-color-metal'>
								Lorem ipsum randomdasdsdasdsadsaadsada
							</p>
						</div>
					</div>
					<div className='grid grid-row-2 gap-1'>
						<p className='font-black text-fontsize-small text-color-darkTeal'>
							{moment().format("hh:mm")}
						</p>
						<p className='text-fontsize-small text-text-color-purity text-center bg-color-notified rounded-full'>
							1
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default BreezeTile;
