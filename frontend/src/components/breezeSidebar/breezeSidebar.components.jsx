import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import {
	MdCall,
	MdSettings,
	MdNewspaper,
	MdOutlinePowerSettingsNew,
} from "react-icons/md";
import { HiUserGroup, HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import { useCallback } from "react";
import { userDAO } from "@Modules/onboarding/core/userDAO";
import BreezeRoutes from "@Constants/routes";
import { useNavigate } from "react-router-dom";
import { useChatState } from "@Context/chatProvider";
import useCombinedStore from "@Zustand/store/store";
const BreezeSidebar = () => {
	const navigate = useNavigate();
	const onLogoutHandler = useCallback(() => {
		const res = userDAO.logoutDAO();
		if (res) navigate(BreezeRoutes.LOGINROUTE);
	}, [navigate]);
	// const { user } = useChatState();
	const { loggedInUser, showActive, showProfile } = useCombinedStore(
		(state) => ({
			loggedInUser: state?.loggedInUser,
			showActive: state?.showActive,
			showProfile: state?.showProfile,
		})
	);
	const sidebarItems = [
		{
			icon: (
				<MdNewspaper
					style={{
						cursor: "pointer",
						color: `var(--background-color-light)`,
						fontSize: `var(--fontsize-trim)`,
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
						fontSize: `var(--fontsize-trim)`,
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
						fontSize: `var(--fontsize-trim)`,
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
						fontSize: `var(--fontsize-trim)`,
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
						fontSize: `var(--fontsize-trim)`,
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

				<div className='flex flex-col justify-between items-center'>
					<div
						className='rounded-2xl mb-6'
						onClick={() => {
							showActive();
							showProfile();
						}}>
						<BreezeAvatar
							profileImage={loggedInUser?.profileImage}
							isGrouped={false}
							isActive={true}
							title={loggedInUser?.name}
						/>
					</div>
					<div className='p-2 rounded-xl bg-gray-700' onClick={onLogoutHandler}>
						<MdOutlinePowerSettingsNew
							style={{
								cursor: "pointer",
								color: `var(--background-color-light)`,
								fontSize: `var(--fontsize-trim)`,
							}}
						/>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default BreezeSidebar;
