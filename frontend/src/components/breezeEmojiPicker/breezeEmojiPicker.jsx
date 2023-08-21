import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";

const BreezeEmojiPicker = ({ message, setMessage, theme, msgBoxRef }) => {
	const [curorPosition, setCursorPosition] = useState(null);

	const handleEmojiPicker = (emojiData, e) => {
		const { emoji } = emojiData;
		const ref = msgBoxRef?.current;
		ref.focus();
		// const start = message?.substring(0, ref?.selectionStart);
		// const end = message?.substring(ref?.selectionStart);
		// const updatedText = start + emoji + end;
		setMessage((prevInput) => prevInput + emoji);
		// msgBoxRef.current.innerText = updatedText;
		// setCursorPosition(start?.length + emoji?.length);
	};

	useEffect(() => {
		msgBoxRef.current.selectionEnd = curorPosition;
	}, [curorPosition, msgBoxRef]);
	return (
		<div>
			<EmojiPicker
				width={"100%"}
				theme={theme}
				onEmojiClick={handleEmojiPicker}
			/>
		</div>
	);
};

export default BreezeEmojiPicker;
