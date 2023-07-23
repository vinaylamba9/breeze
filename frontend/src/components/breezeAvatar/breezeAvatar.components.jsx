import useAvatarColorGenerator from "@Shared/hooks/useAvatarColorGenerator";
import useAvatarInitials from "@Shared/hooks/useAvatarInitials";

const BreezeAvatar = ({
	onClickHandler,
	profileImage,
	isGrouped,
	isActive,
	title,
	isProfileMode,
}) => {
	const [hexColor, textColor] = useAvatarColorGenerator(title);
	const initials = useAvatarInitials(title);

	return isProfileMode ? (
		<div className='relative cursor-pointer ' onClick={onClickHandler}>
			<>
				<div
					className={
						!!profileImage
							? `rounded-2xl p-2 `
							: `p-2  h-36 w-36 relative flex justify-center items-center rounded-2xl  text-xl uppercase`
					}
					style={{
						backgroundColor: hexColor,
						color: textColor,
					}}>
					{!!profileImage ? (
						<img
							className='h-32 w-32  rounded-2xl'
							src={profileImage}
							alt='profile'
						/>
					) : (
						initials
					)}
				</div>
			</>
		</div>
	) : (
		<div className='relative cursor-pointer ' onClick={onClickHandler}>
			<>
				<div
					className={
						!!profileImage
							? `rounded-2xl p-1 `
							: `p-2  h-12 w-12 relative flex justify-center items-center rounded-2xl  text-xl uppercase`
					}
					style={{
						backgroundColor: hexColor,
						color: textColor,
					}}>
					{!!profileImage ? (
						<img
							className='h-10 w-10 rounded-2xl'
							src={profileImage}
							alt='profile'
						/>
					) : (
						initials
					)}
				</div>
				{!isGrouped && isActive && (
					<span className='bottom-0 right-1  absolute  w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-2xl'></span>
				)}
			</>
		</div>
	);
};

export default BreezeAvatar;
