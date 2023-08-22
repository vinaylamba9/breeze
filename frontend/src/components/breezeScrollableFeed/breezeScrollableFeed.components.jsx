import { useRef, useEffect, useCallback, useState } from "react";
import BreezeChat from "@Components/breezeChat/breezeChat.components";
import useCombinedStore from "@/zustand/store/store";

const BreezeScrollableFeed = ({
	showEmojiPicker,
	setEmojiPicker,
	newMessages,
	setNewMessages,
}) => {
	const chatContainerRef = useRef(null);
	const stickyMsgPillRef = useRef(null);
	const timeoutRef = useRef(null);
	const [showPill, setShowPill] = useState(false);
	const { selectedChat } = useCombinedStore((state) => ({
		selectedChat: state?.selectedChat,
	}));
	useEffect(() => {
		scrollToRecent();
	}, [newMessages]);

	useEffect(() => {
		scrollToRecent();
	}, [selectedChat, newMessages]);
	const stickyDateRef = useRef(null);
	const scrollToRecent = () => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	};

	const onScrollMsg = useCallback(() => {
		if (chatContainerRef.current) {
			const { scrollTop } = chatContainerRef?.current;
			setShowPill(scrollTop > 0);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			// Set a new timeout to hide the pill after 2 seconds
			timeoutRef.current = setTimeout(() => {
				setShowPill(false);
			}, 2000);
		}
	}, []);

	useEffect(() => {
		const localRef = chatContainerRef?.current;
		localRef.addEventListener("scroll", onScrollMsg);
		return () => {
			localRef.removeEventListener("scroll", onScrollMsg);
			// Clear the timeout when the component is unmounted
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [onScrollMsg]);

	return (
		<div
			className='w-full bg-gray-100 '
			style={{
				maxHeight: showEmojiPicker
					? "calc(100vh - 600px)"
					: "calc(100vh - 156px)",

				height: showEmojiPicker ? "calc(100vh - 600px)" : "calc(100vh - 156px)",
			}}>
			<div
				onScroll={onScrollMsg}
				className='w-95% mx-auto overflow-y-auto'
				style={{ maxHeight: "100%" }}
				ref={chatContainerRef}>
				<BreezeChat
					setNewMessages={setNewMessages}
					newMessages={newMessages}
					showPill={showPill}
					stickyMsgPillRef={stickyMsgPillRef}
					stickyDateRef={stickyDateRef}
				/>
			</div>
		</div>
	);
};

export default BreezeScrollableFeed;
