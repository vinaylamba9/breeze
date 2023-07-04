import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

const BreezeModal = ({
	isModalOpen,
	closeModal,
	openModal,
	isDismissible = true,
	width,
	children,
}) => {
	const modalRef = useRef();

	useEffect(() => {
		const handleModalClick = (event) => {
			if (!modalRef?.current?.contains(event?.target)) closeModal();
		};
		window.addEventListener("mousedown", handleModalClick);
		return () => {
			window.removeEventListener("mousedown", handleModalClick);
		};
	}, [closeModal]);

	return (
		<div>
			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm'>
					<div className='fixed inset-0 bg-background-color-dark opacity-50'></div>
					<div
						ref={modalRef}
						className={`relative bg-white rounded-2xl p-6 z-50 animate-fadeIn ${
							width || "w-50%"
						}`}>
						<div className='flex ml-auto mr-auto'>
							{children || (
								<div className='mt-10 w-95%'>
									<h2 className='text-xl font-bold mb-4'>Modal Title</h2>
									<p>This is the modal content.</p>
									<button
										onClick={closeModal}
										className='mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
										Close
									</button>
								</div>
							)}
							{isDismissible && (
								<div className='right cursor-pointer absolute right-5 top-4'>
									<IoClose
										style={{
											color: `var(--background-color-dark)`,
											fontSize: `var(--fontsize-trim)`,
										}}
										onClick={closeModal}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BreezeModal;
