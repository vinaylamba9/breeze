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
					src='https://images.unsplash.com/photo-1535850579364-952ef600d22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2204&q=80'
				/>
				<span className='text-center'>
					<p>Seamless Chats, Boundless Connections</p>
					<p className='text-lg text-black font-semibold'>Breeze.io</p>
				</span> */}
			</div>
		)
	);
};

export default ChatNotFound;
