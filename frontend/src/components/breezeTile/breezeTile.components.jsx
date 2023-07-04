import moment from "moment";
import { Fragment } from "react";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";

const BreezeTile = ({
	title,
	bio,
	profileImage,
	isGrouped,
	isActive,
	msg,

	isNotification,
	onClickHandler,
	styleClass,
}) => {
	return (
		<Fragment>
			<div
				onClick={onClickHandler}
				className={`flex my-4 cursor-pointer 
                    justify-start items-center ${styleClass}`}
				style={{ maxHeight: "80px", overflowY: "auto" }}>
				<div className=' m-auto w-95% flex items-center  '>
					<div
						className='flex w-90% items-center justify-start
                    gap-2 '>
						<BreezeAvatar
							profileImage={profileImage}
							isGrouped={isGrouped}
							isActive={isActive}
							title={title}
						/>
						<div className=' grid grid-row-2 gap-1 w-70%'>
							<h3 className='truncate font-black text-sm '>{title}</h3>
							<p className=' truncate text-fontsize-smart text-background-color-metal'>
								{msg || bio}
							</p>
						</div>
					</div>
					<div className='grid grid-row-2 gap-1'>
						<p className='font-black text-fontsize-small text-color-darkTeal'>
							{moment().format("hh:mm")}
						</p>
						{isNotification && (
							<p className='text-fontsize-small font-black text-text-color-purity text-center bg-color-notified rounded-full'>
								1
							</p>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default BreezeTile;
