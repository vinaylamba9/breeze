import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import { HTTPStatusCode } from "@Constants/network";
import BreezeTileSkeleton from "@Components/breezeTileSkeleton/breezeTileSkeleton.components";
import BreezeTile from "@Components/breezeTile/breezeTile.components";
import { userDAO } from "@Modules/onboarding/core/userDAO";

const BreezeSideDrawerBody = () => {
	const [isGroupChat, setGroupChat] = useState(false);
	const [userList, setUserList] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	const getAllUsers = useCallback(async () => {
		setLoading(true);
		const response = await userDAO.getAllUsersDAO();
		if (response?.statusCode === HTTPStatusCode.OK) {
			setUserList(response?.responseBody || []);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);
	return (
		<div className='p-2'>
			<h2 className='text-fontsize-pearl text-color-darkTeal font-bold m-4'>
				Create chat
			</h2>
			<div className='w-100% mt-10 px-4'>
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
			<div className='w-100% mt-10 px-4'>
				{isLoading ? (
					<BreezeTileSkeleton tileLength={6} />
				) : (
					userList?.map((item) => (
						<BreezeTile
							title={item?.name}
							imgBackgroundColor={item?.imgBackgroundColor}
							msg={item?.msg}
							isActive={item?.isActive}
							isGrouped={item?.isGrouped}
							profileImage={item?.profileImage}
							isNotification={item?.isNotification}
							bio={item?.bio}
							styleClass={
								"bg-white py-4 rounded-3xl transform hover:scale-105  hover:shadow-sm transition duration-300 ease-in-out"
							}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default BreezeSideDrawerBody;
