const ChatNotFound = ({ isLoading }) => {
	return (
		!isLoading && (
			<div
				style={{ height: "calc(100vh)", maxHeight: "calc(100vh)" }}
				className='bg-white xs:w-100% sm:w-100% md:w-100% lg:w-100% xl:w-100% flex flex-col  '>
				<div
					style={{ height: "calc(95vh)", maxHeight: "calc(95vh)" }}
					className='  flex flex-col items-center justify-center gap-10 '>
					<img
						style={{ height: "200px", maxHeight: "220px" }}
						alt='no_chat_found'
						src='https://res.cloudinary.com/dtjqyp0r2/image/upload/v1693462643/Group_2_ij1xq5.png'
					/>
					<span>
						<p className='text-fontsize-brittle	 font-medium text-gray-600'>
							Seamless Chat, Boundless Connection
						</p>
					</span>
				</div>
				<div className='flex-1 '>
					<div className=' text-center text-fontsize-brittle text-gray-700 font-semibold'>
						Breeze.io
					</div>
					<br />
					<div className='h-1.5 w-full bg-black'></div>
				</div>
			</div>
		)
	);
};

export default ChatNotFound;
