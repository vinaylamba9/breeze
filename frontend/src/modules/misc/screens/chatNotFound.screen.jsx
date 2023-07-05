const ChatNotFound = () => {
	return (
		<div className='xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex flex-col items-center justify-between  gap-2 py-2'>
			<img
				alt='no_chat_found'
				style={{
					minHeight: "50vh",
					maxHeight: "50vh",
				}}
				className='w-90 bg-no-repeat object-cover'
				src='https://res.cloudinary.com/dtjqyp0r2/image/upload/v1688464727/Texting-bro_zmm4iu.png'
			/>
			<p className='z-10 absolute bottom-0 mb-20%'>
				Seamless Chats, Boundless Connections
			</p>
			<h2 className='z-10 absolute bottom-0 mb-18% text-color-darkTeal text-fontsize-glossy font-semibold'>
				Breeze.io
			</h2>
		</div>
	);
};

export default ChatNotFound;
