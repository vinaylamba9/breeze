import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import { ChatDAO } from "@/modules/chat/core/chatDAO";
import { HTTPStatusCode } from "@/constants/network";
import BreezeTileSkeleton from "../breezeTileSkeleton/breezeTileSkeleton.components";

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
		const response = await ChatDAO.getAllUsersDAO();
		if (response?.statusCode === HTTPStatusCode.OK) {
			setUserList(response?.responseBody);
			// setLoading(false);
		}
	}, []);

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);
	return (
		<div className='p-2%'>
			<h2 className='text-fontsize-pearl text-color-darkTeal font-bold m-4'>
				Create chat
			</h2>
			<div className='w-100% mt-10'>
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
			<div className='w-100% mt-10'>
				{isLoading && <BreezeTileSkeleton tileLength={6} />}
			</div>
		</div>
	);
};

export default BreezeSideDrawerBody;
