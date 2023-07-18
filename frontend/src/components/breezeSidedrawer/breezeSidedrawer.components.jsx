import { useEffect, useRef, useState } from "react";
import { IoClose, IoArrowBackOutline } from "react-icons/io5";
import { useSelectUserFomGroupState } from "@Context/selectUserFromGroupProvider";
const BreezeSideDrawer = ({
	children,
	isOpen,
	onClose,
	position = "left-0",
	backgroundColor = "bg-color-slate",
}) => {
	const sideDrawerRef = useRef();
	const [showContent, setShowContent] = useState(false);
	const { selectUserFromGroup, setSelectUserFromGroup } =
		useSelectUserFomGroupState();
	useEffect(() => {
		const handleSideDrawerClick = (event) => {
			if (!sideDrawerRef?.current?.contains(event?.target)) onClose();
		};

		window.addEventListener("mousedown", handleSideDrawerClick);

		return () => {
			window.removeEventListener("mousedown", handleSideDrawerClick);
		};
	}, [onClose]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowContent(isOpen);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [isOpen]);

	const drawerClasses = ` mx-auto fixed inset-y-0 ${position} z-50 w-28% ${backgroundColor} shadow-2xl    ${
		isOpen ? "animate-slideIn" : "animate-slideOut"
	}`;

	return (
		<main
			className={
				"fixed z-20 backdrop-blur-md  inset-0 transform ease-in  " +
				(isOpen
					? "transition-opacity opacity-100 duration-500 translate-x-0"
					: "transition-all opacity-0 translate-x-full")
			}
			style={{ overflowY: "auto !required" }}>
			<div
				ref={sideDrawerRef}
				className={drawerClasses}
				style={{
					borderTopRightRadius: position === "left-0" && "1rem",
					borderBottomRightRadius: position === "left-0" && "1rem",
					borderTopLeftRadius: position === "right-0" && "1rem",
					borderBottomLeftRadius: position === "right-0" && "1rem",
				}}>
				{selectUserFromGroup ? (
					<div
						className={`${
							position === "left-0" ? "right" : "left"
						} cursor-pointer absolute ${
							position === "left-0" ? "right-5" : "left-5"
						} top-4`}>
						<IoArrowBackOutline
							style={{
								color: `var(--background-color-dark)`,
								fontSize: `var(--fontsize-trim)`,
							}}
							onClick={() => setSelectUserFromGroup(null)}
						/>
					</div>
				) : (
					<div
						className={`${
							position === "left-0" ? "right" : "left"
						} cursor-pointer absolute ${
							position === "left-0" ? "right-5" : "left-5"
						} top-4`}>
						<IoClose
							style={{
								color: `var(--background-color-dark)`,
								fontSize: `var(--fontsize-trim)`,
							}}
							onClick={onClose}
						/>
					</div>
				)}
				{showContent && <div className='animate-fadeIn p-4 '>{children}</div>}
			</div>
			<section
				className='w-screen h-full cursor-pointer'
				onClick={onClose}></section>
		</main>
	);
};

export default BreezeSideDrawer;
