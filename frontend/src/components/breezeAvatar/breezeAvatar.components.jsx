const BreezeAvatar = ({
	imgBackgroundColor,
	profileImage,
	isGrouped,
	isActive,
}) => {
	return (
		<div className='relative cursor-pointer'>
			<div
				className={`  rounded-full p-1 `}
				style={{ backgroundColor: imgBackgroundColor }}>
				{profileImage && (
					<img
						className='h-10 w-10 rounded-full'
						src={profileImage}
						alt='profile'
					/>
				)}
			</div>
			{!isGrouped && isActive && (
				<span className='bottom-0 right-1  absolute  w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full'></span>
			)}
		</div>
	);
};

export default BreezeAvatar;
