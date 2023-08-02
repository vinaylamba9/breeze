import { Fragment } from "react";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { RxDashboard } from "react-icons/rx";
import { MdCall, MdSettings } from "react-icons/md";
import { HiUserGroup, HiChatBubbleLeftEllipsis } from "react-icons/hi2";

const BreezeSidebar = () => {
	return (
		<Fragment>
			<div className='bg-black px-5 flex h-screen'>
				<div
					className='flex flex-col justify-between items-center overflow-y-auto  my-auto w-100% '
					style={{ height: "95vh", maxHeight: "95vh" }}>
					<div className=''>
						<div className='p-3 rounded-2xl mb-6'>
							<RxDashboard
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>

						<div className='bg-gray-700 p-3 rounded-2xl mb-6'>
							<HiChatBubbleLeftEllipsis
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>
						<div className='p-3 rounded-2xl mb-6'>
							<HiUserGroup
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>
						<div className=' p-3 rounded-2xl mb-6'>
							<MdCall
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>
						<div className='p-3 rounded-2xl mb-6'>
							<MdSettings
								style={{
									cursor: "pointer",
									color: `var(--background-color-light)`,
									fontSize: `var(--fontsize-trim)`,
								}}
							/>
						</div>
						{/* <div className='text-white text-fontsize-small'>Dashboard</div> */}
					</div>

					<div className='rounded-2xl mb-6'>
						<BreezeAvatar
							// profileImage={user?.profileImage}
							isGrouped={false}
							isActive={true}
							title={"Shekhar Shashank"}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default BreezeSidebar;
