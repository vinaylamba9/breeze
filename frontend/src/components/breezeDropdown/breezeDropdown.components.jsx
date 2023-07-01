import { Fragment, useEffect, useRef, useState } from "react";
import BreezeDivider from "@Components/breezeDivider/breezeDivider.components";

const BreezeDropdown = ({ children, listItems, isIcon, menuAction }) => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef();
	const itemRef = useRef();

	useEffect(() => {
		const handleDropdownClick = (event) => {
			if (
				!menuRef?.current?.contains(event?.target) &&
				!itemRef?.current?.contains(event?.target)
			) {
				setOpen(false);
			}
		};

		window.addEventListener("click", handleDropdownClick);

		return () => {
			window.removeEventListener("click", handleDropdownClick);
		};
	}, []);

	return (
		<Fragment>
			<div className='flex flex-col items-center ' ref={itemRef}>
				<div onClick={() => setOpen(!open)}>{children}</div>
				{open && (
					<div
						ref={menuRef}
						className={`${
							open
								? "z-10 rounded-2xl  backdrop-blur-lg p-4 shadow-lg absolute mt-14 animate-fadeIn"
								: " animate-fadeOut"
						} `}>
						<ul>
							{listItems?.map((item, index) => {
								return (
									<>
										<li
											data-index={item?.key}
											onClick={(e) => menuAction(e, item?.key)}
											key={item?.key}
											className={
												item?.isDisabled
													? "flex justify-start items-center py-2 cursor-not-allowed opacity-30"
													: " flex justify-start items-center ease-out duration-300 hover:font-semibold hover:text-color-darkTeal hover:tracking-wide   py-2 cursor-pointer"
											}>
											{isIcon && (
												<>
													<span key={item?.key}>{item?.icon}</span>{" "}
													&nbsp;&nbsp;&nbsp;
												</>
											)}
											<span key={item?.key}>{item?.label}</span>
										</li>
										{index <= listItems?.length - 2 && <BreezeDivider />}
									</>
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default BreezeDropdown;
