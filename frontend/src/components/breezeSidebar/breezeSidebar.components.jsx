import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import { MdCall, MdSettings, MdNewspaper } from "react-icons/md";
import { HiUserGroup, HiChatBubbleLeftEllipsis } from "react-icons/hi2";

const BreezeSidebar = () => {
	const sidebarItems = [
		{
			icon: (
				<MdNewspaper
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-glossy)`,
					}}
				/>
			),
			text: "Feed",
			isActive: false,
		},
		{
			icon: (
				<HiChatBubbleLeftEllipsis
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-glossy)`,
					}}
				/>
			),
			text: "Chat",
			isActive: true,
		},
		{
			icon: (
				<HiUserGroup
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-glossy)`,
					}}
				/>
			),
			text: "Group",
			isActive: false,
		},
		{
			icon: (
				<MdCall
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-glossy)`,
					}}
				/>
			),
			text: "Call",
			isActive: false,
		},
		{
			icon: (
				<MdSettings
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-glossy)`,
					}}
				/>
			),
			text: "Settings",
			isActive: false,
		},
	];
	return (
		<aside className='bg-black px-5 flex h-screen'>
			<div
				className='flex flex-col justify-between items-center overflow-y-auto  my-auto w-100% '
				style={{ height: "95vh", maxHeight: "95vh" }}>
				<div className='flex flex-col justify-center items-center'>
					{sidebarItems?.map((item, index) => (
						<div
							className='mb-6 flex flex-col justify-center items-center cursor-pointer'
							key={index}>
							<div
								className={`p-2 ${
									item?.isActive && "bg-gray-700"
								} rounded-xl self-center hover:bg-gray-700 hover:rounded-xl tranition duration-300 ease-in-out`}>
								{item?.icon}
							</div>
							<p className='truncate  text-white text-xs text-center'>
								{item?.text}
							</p>
						</div>
					))}
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
		</aside>
	);
};

export default BreezeSidebar;
