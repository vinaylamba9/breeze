import moment from "moment";
import { Fragment } from "react";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import useAvatarColorGenerator from "@Shared/hooks/useAvatarColorGenerator";

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
	unreadMessageCount,
}) => {
	const [hexColor, textColor] = useAvatarColorGenerator(lastMsgSender);

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
						<div className=' grid grid-row-2 gap-1 w-70%  '>
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
								<span className=' truncate flex items-center justify-start gap-2'>
									<p
										className=' px-2 py-0.5 font-normal rounded-xl text-xs'
										style={{ backgroundColor: hexColor, color: textColor }}>
										{lastMsgSender?.split(" ")?.[0] + " ~ "}
									</p>
									<p className='text-black text-sm'>{msg}</p>
								</span>
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

					<div className='grid grid-row-2 gap-1'>
						{isAdmin && (
							<div className='drop-shadow-md px-4 py-1 text-xs bg-color-admin rounded-xl text-color-darkTeal font-medium ease-in-out duration-300 hover:tracking-wider'>
								Admin
							</div>
						)}
						{isLastTimeActive && (
							<div className='font-black text-center text-xs  text-gray-500 '>
								{moment().format("hh:mm")}
							</div>
						)}
						{isNotification && unreadMessageCount > 0 && (
							<div className='px-2 py-0.5 text-center text-xs bg-green-500 text-white rounded-full'>
								{unreadMessageCount}
							</div>
						)}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default BreezeTile;
