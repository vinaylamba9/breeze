const ChatNotFound = ({ isLoading }) => {
	return (
		!isLoading && (
			<div
				style={{ height: "calc(100vh - 170px)" }}
				className='xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex flex-col items-center   gap-2 py-2'>
				<img
					style={{ height: "calc(100vh - 300px)" }}
					alt='no_chat_found'
					className='w-50 h-32 bg-no-repeat object-center'
					src='https://res.cloudinary.com/dtjqyp0r2/image/upload/v1688464727/Texting-bro_zmm4iu.png'
				/>
				<span className='text-center'>
					<p>Seamless Chats, Boundless Connections</p>
					<p className='text-lg text-color-darkTeal font-semibold'>Breeze.io</p>
				</span>
			</div>
		)
	);
};

export default ChatNotFound;
