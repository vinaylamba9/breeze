import BreezeMessageFields from "@Components/breezeMessageField/breezeMessageField.components";
import BreezeMessageHeader from "@Components/breezeMessageHeader/breezeMessageHeader.components";

const BreezeChatBox = ({ fetchAgain, setFetchAgain }) => {
	return (
		<>
			<div
				style={{ height: "calc(100vh - 170px)" }}
				className=' flex flex-col justify-between items-center rounded-2xl '>
				<BreezeMessageHeader
					fetchAgain={fetchAgain}
					setFetchAgain={setFetchAgain}
				/>
				<div
					className='w-100% bg-transparent overflow-y-auto'
					style={{ height: "calc(100vh - 280px)" }}></div>
				<BreezeMessageFields />
			</div>
		</>
	);
};

export default BreezeChatBox;
