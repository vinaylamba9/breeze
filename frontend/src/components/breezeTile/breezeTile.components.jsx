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
	lastMessageTime,
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
				<div className={` m-auto w-95%  flex items-start justify-between `}>
					<div
						className='flex w-80%  items-start justify-start 
                    gap-2 '>
						<BreezeAvatar
							profileImage={profileImage}
							isGrouped={isGrouped}
							isActive={isActive}
							title={title}
						/>
						<div className=' flex flex-col items-start justify-between gap-1 w-70%  '>
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

							{lastMsgSender ? (
								<div className=' truncate flex items-center justify-start gap-2'>
									<p
										className=' px-2 py-0.5 font-normal rounded-xl text-xs'
										style={{ backgroundColor: hexColor, color: textColor }}>
										{lastMsgSender?.split(" ")?.[0]}
									</p>
									<p className='text-black text-sm'>{msg}</p>
								</div>
							) : null}

							{bio && (
								<div className='flex justify-start gap-2 items-center truncate'>
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
						</div>
					</div>

					<div className='flex flex-col items-center justify-between gap-2'>
						{isAdmin && (
							<div className='drop-shadow-md px-4 py-1 text-xs bg-color-admin rounded-xl text-color-darkTeal font-medium ease-in-out duration-300 hover:tracking-wider'>
								Admin
							</div>
						)}
						{lastMessageTime ? (
							<div className='font-black text-center text-fontsize-small  text-gray-500 '>
								{lastMessageTime}
							</div>
						) : null}
						{isNotification && unreadMessageCount > 0 && (
							<div className=' px-2 py-0.5 text-center text-fontsize-small bg-green-500 text-white rounded-full'>
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
