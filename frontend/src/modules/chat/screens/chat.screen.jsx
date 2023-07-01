import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

import BreezeTile from "@Components/breezeTile/breezeTile.components";
import ChatModel from "@Models/chat.model";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import BreezeModal from "@Components/breezeModal/breezeModal.components";
import { ChatState } from "@Context/chatProvider";
import BreezeDropdown from "@Components/breezeDropdown/breezeDropdown.components";
import { profileDropdown } from "@Constants/application";

const ChatScreen = () => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	const [isOpen, setIsOpen] = useState(false);
	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => {
		setIsOpen(false);
	};

	const { user } = ChatState();

	const getChatListMemo = useMemo(
		() => [
			new ChatModel({
				chatID: "chat1",
				chatTitle: "Martin Luther",
				msg: "Lorem ipsum no way",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801430/Zw_dxdyvy.png",
				isNotification: false,
				isGrouped: false,
				isActive: true,
				imgBackgroundColor: "bg-color-poppedUp",
			}),
			new ChatModel({
				chatID: "chat2",
				chatTitle: "John Doe",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801430/Zw_dxdyvy.png",
				isNotification: true,
				isGrouped: false,
				imgBackgroundColor: "bg-straw-color",
			}),
			new ChatModel({
				chatID: "chat3",
				chatTitle: "John Wick",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801424/Zw_xjexrz.png",
				isNotification: true,
				isGrouped: false,
				isActive: true,
				imgBackgroundColor: "bg-color-slate",
			}),
			new ChatModel({
				chatID: "chat4",
				chatTitle: "John Doe",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801430/Zw_dxdyvy.png",
				isNotification: true,
				isGrouped: false,
				imgBackgroundColor: "bg-color-tanz",
			}),
			new ChatModel({
				chatID: "chat5",
				chatTitle: "John Doe",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801318/Zw_iezt0o.png",
				isNotification: true,
				isGrouped: false,
				imgBackgroundColor: "bg-color-soil",
			}),
			new ChatModel({
				chatID: "chat1",
				chatTitle: "John Doe",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801430/Zw_dxdyvy.png",
				isNotification: true,
				isGrouped: false,
				imgBackgroundColor: "bg-color-poppedUp",
			}),
			new ChatModel({
				chatID: "chat2",
				chatTitle: "John Doe",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801430/Zw_dxdyvy.png",
				isNotification: true,
				isGrouped: false,
				imgBackgroundColor: "bg-straw-color",
			}),
			new ChatModel({
				chatID: "chat3",
				chatTitle: "John Wick",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801318/Zw_iezt0o.png",
				isNotification: true,
				isGrouped: false,
				isActive: true,
				imgBackgroundColor: "bg-color-slate",
			}),
			new ChatModel({
				chatID: "chat4",
				chatTitle: "John Doe",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801408/Zw_prtnxj.png",
				isNotification: true,
				isGrouped: false,
				imgBackgroundColor: "bg-color-tanz",
			}),
			new ChatModel({
				chatID: "chat5",
				chatTitle: "John Doe",
				msg: "Lorem ipsum randomdasdsdasdsadsaadsada",
				profileImage:
					"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801421/Zw_g9sey2.png",
				isNotification: true,
				isGrouped: false,
				isActive: true,
				imgBackgroundColor: "bg-color-soil",
			}),
		],
		[]
	);
	return (
		<div className='flex gap-5'>
			<div className='sm:w-100% md:w-40% lg:w-30%'>
				<div className=' flex items-center justify-between'>
					<div className='w-70%'>
						<BreezeSearch
							placeholder={"Search chat"}
							leadingIcon={
								<BiSearch
									style={{
										color: `var(--color-darkTeal)`,
										fontSize: `var(--fontsize-glossy)`,
									}}
								/>
							}
							register={register}
							name='searchUser'
						/>
					</div>
					<div>
						<BreezeTooltip id={"createChat"}>
							<button
								onClick={openModal}
								title='Contact Sale'
								className='
                                cursor-pointer
                                bg-color-darkTeal
                                w-10 h-10
                                rounded-full 
                                flex justify-center items-center
                            text-white text-4xl 
                                '>
								<span
									data-tooltip-id='createChat'
									data-tooltip-content='Create Chat'>
									<BsPlusLg
										style={{
											color: `var(--background-color-light)`,
											fontSize: `var(--fontsize-trim)`,
											fontWeight: 900,
										}}
									/>
								</span>
							</button>
						</BreezeTooltip>
						{isOpen && (
							<BreezeModal
								children={<h1>Hello</h1>}
								isModalOpen={isOpen}
								openModal={openModal}
								closeModal={closeModal}
							/>
						)}
					</div>
				</div>
				<br />
				<div
					className='bg-background-color-light px-2 rounded-3xl'
					style={{
						minHeight: "80vh",
					}}>
					<div
						className='my-2'
						style={{
							maxHeight: "78vh",
							minHeight: "78vh",
							overflowY: "scroll",
						}}>
						{getChatListMemo?.map((item, index) => {
							return (
								<div key={`tile_item_${index}`}>
									<BreezeTile chatItem={item} />
									<hr
										style={{
											width: "95%",
											margin: "0 auto",
											borderTop: "1px solid var(--muted-color)",
										}}
									/>
								</div>
							);
						})}
					</div>
				</div>
				<br />
			</div>
			<div className='sm:w-100% md:w-40% lg:w-70%'>
				<div className='flex justify-end items-center'>
					<BreezeDropdown
						listItems={profileDropdown}
						menuAction={(e, key) => {
							console.log(key);
						}}
						isIcon={true}
						children={
							<BreezeTooltip id={"profileImage"}>
								<div
									data-tooltip-id='profileImage'
									data-tooltip-content={user?.name}>
									<BreezeAvatar
										imgBackgroundColor={"bg-straw-color"}
										profileImage={user?.profileImage}
										isGrouped={false}
										isActive={true}
									/>
								</div>
							</BreezeTooltip>
						}
					/>
				</div>
				<br />

				<div
					className='bg-background-color-light px-2 rounded-3xl'
					style={{
						minHeight: "80vh",
					}}>
					<div
						className='my-2'
						style={{
							maxHeight: "78vh",
							minHeight: "78vh",
							overflowY: "scroll",
						}}></div>
				</div>
				<br />
			</div>
		</div>
	);
};

export default ChatScreen;
