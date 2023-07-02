import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const BreezeSideDrawer = ({ children, isOpen, onClose }) => {
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
	const drawerClasses = `fixed inset-y-0 left-0 z-50 w-35% backdrop-blur-md bg-white/70 shadow-2xl transform transition-transform ease-in-out duration-300 ${
		isOpen ? "animate-slideIn" : "animate-slideOut"
	}`;

	return (
		<div
			ref={sideDrawerRef}
			className={drawerClasses}
			style={{ borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem" }}>
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
	);
};

export default BreezeSideDrawer;
