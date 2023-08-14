import moment from "moment";
import { Fragment } from "react";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";

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
	email,
}) => {
	return (
		<Fragment>
			<div
				onClick={onClickHandler}
				className={`flex my-4 cursor-pointer 
                    justify-start items-center ${styleClass}  `}>
				<div className={` m-auto w-95%  flex items-center justify-between `}>
					<div
						className='flex w-80%  items-start justify-start 
                    gap-2 '>
						<BreezeAvatar
							profileImage={profileImage}
							isGrouped={isGrouped}
							isActive={isActive}
							title={title}
						/>
						<div className=' grid grid-row-2 gap-1 w-70% '>
							<h3 className='truncate font-black text-sm '>{title}</h3>
							<Fragment className=' truncate '>
								{email && (
									<div className='flex justify-start gap-2 items-center'>
										<MdEmail
											className='mt-1'
											style={{
												color: `text-gray-600`,
												fontSize: `var(--fontsize-smart)`,
											}}
										/>
										<p className=' text-gray-700 text-fontsize-smart'>
											{email}
										</p>
									</div>
								)}
							</Fragment>

							{msg && (
								<p className=' truncate text-fontsize-smart text-gray-500'>
									{msg}
								</p>
							)}
							<Fragment className=' truncate '>
								{bio && (
									<div className='flex justify-start gap-2 items-center'>
										<MdOutlineSubtitles
											className='mt-0.5'
											style={{
												color: `text-gray-600`,
												fontSize: `var(--fontsize-smart)`,
											}}
										/>
										<p className=' text-gray-500 text-fontsize-smart'>{bio}</p>
									</div>
								)}
							</Fragment>
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
