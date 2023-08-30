const ChatNotFound = ({ isLoading }) => {
	return (
		!isLoading && (
			<div
				style={{ height: "calc(100vh)" }}
				className='bg-white xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100%  flex flex-col items-center justify-center gap-10 py-2'>
				<img
					style={{ height: "200px" }}
					alt='no_chat_found'
					src='https://res.cloudinary.com/dtjqyp0r2/image/upload/v1693420198/Group_2_lbsqh2.png'
				/>
				<span className='text-center'>
					<p>Seamless Chats, Boundless Connections</p>
					<p className='text-lg text-black font-semibold'>Breeze.io</p>
				</span>
			</div>
		)
	);
};

export default ChatNotFound;
