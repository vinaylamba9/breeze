import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const BreezeSideDrawer = ({ children, isOpen, onClose, position = "left" }) => {
	const sideDrawerRef = useRef();

	useEffect(() => {
		const handleSideDrawerClick = (event) => {
			if (!sideDrawerRef?.current?.contains(event?.target)) onClose();
		};

		window.addEventListener("mousedown", handleSideDrawerClick);

		return () => {
			window.removeEventListener("mousedown", handleSideDrawerClick);
		};
	}, [onClose]);
	const drawerClasses = `fixed inset-y-0 ${position}-0 z-50 w-30% bg-color-slate  shadow-2xl transform transition-transform ease-in-out duration-300 ${
		isOpen ? "animate-slideIn" : "animate-slideOut"
	}`;

	return (
		//
		<main
			className={
				" fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
				(isOpen
					? " transition-opacity opacity-100 duration-500 translate-x-0  "
					: " transition-all delay-500 opacity-0 translate-x-full  ")
			}>
			<div
				ref={sideDrawerRef}
				className={drawerClasses}
				style={{
					borderTopRightRadius: "1rem",
					borderBottomRightRadius: "1rem",
				}}>
				<div className='right cursor-pointer absolute right-5 top-4'>
					<IoClose
						style={{
							color: `var(--background-color-dark)`,
							fontSize: `var(--fontsize-trim)`,
						}}
						onClick={onClose}
					/>
				</div>
				<div className='p-4'>{children}</div>
			</div>
			<section
				className=' w-screen h-full cursor-pointer '
				onClick={onClose}></section>
		</main>
	);
};

export default BreezeSideDrawer;
