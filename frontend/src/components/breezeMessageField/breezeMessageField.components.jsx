import BreezeTooltip from "@Components/breezeTooltip/breezeTooltip.components";
import {
	MdOutlineEmojiEmotions,
	MdOutlineKeyboardArrowUp,
	MdOutlineAttachFile,
} from "react-icons/md";
const BreezeMessageFields = () => {
	return (
		<div className='rounded-bl-2xl drop-shadow-md bg-color-TealWithOpacity py-2 rounded-br-2xl w-100% '>
			<div className=' w-98% mx-auto flex justify-start items-start '>
				<div className='mx-1 py-2  cursor-pointer text-center rounded-full flex items-end'>
					<BreezeTooltip id={"emoticons"}>
						<span data-tooltip-id='emoticons' data-tooltip-content='Emojis'>
							<MdOutlineEmojiEmotions className='text-color-darkTeal text-fontsize-trim' />
						</span>
					</BreezeTooltip>
				</div>
				<div className='mx-1 py-2  cursor-pointer text-center  rounded-full flex items-end'>
					<BreezeTooltip id={"attachements"}>
						<span
							data-tooltip-id='attachements'
							data-tooltip-content='Attachements'>
							<MdOutlineAttachFile className='text-color-darkTeal text-fontsize-trim' />
						</span>
					</BreezeTooltip>
				</div>
				<div
					style={{
						wordBreak: "break-word",
						minHeight: "40px",
						maxHeight: "70px",
						userSelect: "text",
					}}
					className='  bg-white text-md w-100%  rounded-2xl 
		mx-auto px-4 py-1.5 overflow-y-auto'
					contentEditable
					suppressContentEditableWarning
					placeholder='Type a message'
					title='Type a message'
					tabIndex={10}
					datalexicaleditor
					spellCheck></div>
				<div className=' py-2 mx-1  cursor-pointer text-center flex items-end'>
					<BreezeTooltip id={"editor"}>
						<span data-tooltip-id='editor' data-tooltip-content='Editor'>
							<MdOutlineKeyboardArrowUp className='text-color-darkTeal text-fontsize-trim' />
						</span>
					</BreezeTooltip>
				</div>
			</div>
		</div>
	);
};

export default BreezeMessageFields;
