const ChatNotFound = ({ isLoading }) => {
	return (
		!isLoading && (
			<div
				style={{ height: "calc(100vh)" }}
				className='bg-gray-100 xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex flex-col items-center   gap-2 py-2'>
				{/* <img
					style={{ height: "calc(100vh - 300px)" }}
					alt='no_chat_found'
					className='w-50 h-32 bg-no-repeat object-center'
					src=''
				/> */}
				<span className='text-center'>
					<p>Seamless Chats, Boundless Connections</p>
					<p className='text-lg text-black font-semibold'>Breeze.io</p>
				</span>
			</div>
		)
	);
};

export default ChatNotFound;
