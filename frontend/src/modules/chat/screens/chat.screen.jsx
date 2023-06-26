import BreezeTile from "@/components/breezeTile/breezeTile.components";
import BreezeSearch from "@Components/breezeSearch/breezeSearch.components.jsx";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
const ChatScreen = () => {
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: { errors },
	} = useForm({});

	return (
		<div style={{ width: "20%" }}>
			<BreezeSearch
				placeholder={"Search"}
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
					maxHeight: "80vh",
					overflowY: "scroll",
				}}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((item) => {
					return (
						<div>
							<BreezeTile />
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
			<br />
		</div>
	);
};

export default ChatScreen;
