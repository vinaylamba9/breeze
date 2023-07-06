import { MdInfo } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import BreezeImageUpload from "@Components/breezeImageUpload/breezeImageUpload.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import BreezePills from "@Components/breezePills/breezePills.components";
const BreezeGroupChat = ({ userList }) => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	return (
		<div className='w-90% mx-auto '>
			<div className='flex items-center justify-start gap-1 '>
				<div className='w-30% flex flex-col justify-between  items-start'>
					<div className='absolute top-16'>
						<h2 className='text-fontsize-pearl text-color-darkTeal font-bold'>
							Create group chat
						</h2>

						<div className='text-sm text-gray-400 tracking-normal flex items-center gap-1'>
							<span>
								<MdInfo />{" "}
							</span>
							<span>Click on users to create chat.</span>
						</div>
					</div>
					<div>
						<BreezeImageUpload />
					</div>
				</div>
				<div className='w-70%'>
					<div className=' mt-10 '>
						<BreezeSearch
							placeholder={"Search user"}
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
					<div className='mt-5 flex flex-nowrap items-center justify-start overflow-x-scroll gap-2'>
						{[1, 2, 3, 4, 5, 6, 2, 2131, 2137]?.map((item) => (
							<div key={item} className='flex-shrink-0'>
								<BreezePills title={"shekhar"} />
							</div>
						))}
					</div>
					<div
						className='w-100% mt-5  '
						style={{
							minHeight: "55vh",
						}}>
						<div
							className='my-2 rounded-2xl flex flex-wrap gap-1 items-center justify-between'
							style={{
								maxHeight: "50vh",
								minHeight: "50vh",
								overflowY: "scroll",
							}}>
							{userList?.map((item) => {
								return (
									<div className='w-48%'>
										<BreezeTile
											// onClickHandler={() => onCreateChatHandler(item?._id)}
											title={item?.name}
											imgBackgroundColor={item?.imgBackgroundColor}
											msg={item?.msg}
											isActive={item?.isActive}
											isGrouped={item?.isGrouped}
											profileImage={item?.profileImage}
											isNotification={item?.isNotification}
											bio={item?.bio}
											styleClass={
												"bg-white py-4 rounded-2xl transform  hover:bg-color-TealWithOpacity  transition duration-300 ease-in-out"
											}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BreezeGroupChat;
