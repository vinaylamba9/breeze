import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import BreezeTile from "@/components/breezeTile/breezeTile.components";
import ChatModel from "@/models/chat.model";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeAvatar from "@Components/breezeAvatar/breezeAvatar.components";
const ChatScreen = () => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

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
				<BreezeSearch
					placeholder={"Search or start new chat"}
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
						{getChatListMemo?.map((item) => {
							return (
								<div>
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
					<BreezeAvatar
						imgBackgroundColor={"bg-straw-color"}
						profileImage={
							"https://res.cloudinary.com/dtjqyp0r2/image/upload/v1687801344/Zw_rq0d0u.png"
						}
						isGrouped={false}
						isActive={true}
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
