import { useRef, useEffect } from "react";
import BreezeChat from "@Components/breezeChat/breezeChat.components";
import { useChatState } from "@Context/chatProvider";
const BreezeScrollableFeed = ({ newMessages, isTyping }) => {
	const { selectedChat } = useChatState();
	const chatContainerRef = useRef(null);

	useEffect(() => {
		scrollToRecent();
	}, [newMessages]);

	useEffect(() => {
		scrollToRecent();
	}, [selectedChat, newMessages]);

	const scrollToRecent = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	};

	return (
		<div
			className='w-full bg-transparent'
			style={{
				height: isTyping ? "calc(100vh - 320px)" : "calc(100vh - 290px)",
			}}>
			<div
				className='w-98% mx-auto overflow-y-auto'
				style={{ maxHeight: "100%" }}
				ref={chatContainerRef}>
				<BreezeChat newMessages={newMessages} />
			</div>
		</div>
	);
};

export default BreezeScrollableFeed;
