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
	lastMsgSender,
	isAdmin,
	isNotification,
	onClickHandler,
	styleClass,
	isLastTimeActive,
}) => {
	return (
		<Fragment>
			<div
				onClick={onClickHandler}
				className={`flex my-4 cursor-pointer 
                    justify-start items-center ${styleClass}  `}>
				<div className={` m-auto w-95%  flex items-center justify-between `}>
					<div
						className='flex w-80%  items-center justify-start 
                    gap-2 '>
						<BreezeAvatar
							profileImage={profileImage}
							isGrouped={isGrouped}
							isActive={isActive}
							title={title}
						/>
						<div className=' grid grid-row-2 gap-1 w-70% '>
							<h3 className='truncate font-black text-sm '>{title}</h3>
							<p className=' truncate text-fontsize-smart text-background-color-metal'>
								{msg || bio}
							</p>
						</div>
					</div>

					<div className=' grid grid-row-2 gap-3  '>
						{isAdmin && (
							<div className='drop-shadow-md px-4 py-1 text-xs bg-color-admin rounded-xl text-color-darkTeal font-medium ease-in-out duration-300 hover:tracking-wider'>
								Admin
							</div>
						)}
						{isLastTimeActive && (
							<p className='font-black text-fontsize-small text-color-darkTeal'>
								{moment().format("hh:mm")}
							</p>
						)}
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
