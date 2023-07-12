import useAvatarColorGenerator from "@Shared/hooks/useAvatarColorGenerator";
import useAvatarInitials from "@Shared/hooks/useAvatarInitials";

const BreezeAvatar = ({
	onClickHandler,
	profileImage,
	isGrouped,
	isActive,
	title,
}) => {
	const [hexColor, textColor] = useAvatarColorGenerator(title);
	const initials = useAvatarInitials(title);

	return (
		<div className='relative cursor-pointer' onClick={onClickHandler}>
			<>
				<div
					className={
						!!profileImage
							? `rounded-full p-1 `
							: `p-1  h-12 w-12 relative flex justify-center items-center rounded-full  text-xl uppercase`
					}
					style={{
						backgroundColor: hexColor,
						color: textColor,
					}}>
					{!!profileImage ? (
						<img
							className='h-10 w-10 rounded-full'
							src={profileImage}
							alt='profile'
						/>
					) : (
						initials
					)}
				</div>
				{!isGrouped && isActive && (
					<span className='bottom-0 right-1  absolute  w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
				)}
			</>
		</div>
	);
};

export default BreezeAvatar;
