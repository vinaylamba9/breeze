import useAvatarColorGenerator from "@Shared/hooks/useAvatarColorGenerator";

const BreezePills = ({ title, onRemove }) => {
	const [hexColor, textColor] = useAvatarColorGenerator("Default");

	return (
		<span
			style={{
				backgroundColor: "#005459",
				color: textColor || "white",
			}}
			id='badge-dismiss-default'
			className={`flex items-center px-4 py-2  text-sm font-medium rounded-2xl cursor-pointer `}>
			{title || "Default"}
			<button
				style={{
					color: textColor || "white",
				}}
				onClick={onRemove}
				type='button'
				className={`inline-flex items-center p-1 ml-2 text-sm  bg-color-darkTeal  rounded-sm  hover:text-blue-900 `}
				data-dismiss-target='#badge-dismiss-default'
				aria-label='Remove'>
				<svg
					className='w-2 h-2'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 14 14'>
					<path
						stroke='currentColor'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
					/>
				</svg>
				<span className='sr-only'>Remove badge</span>
			</button>
		</span>
	);
};

export default BreezePills;
