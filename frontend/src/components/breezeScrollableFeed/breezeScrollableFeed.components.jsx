import { useRef, useEffect, useCallback, useState } from "react";
import BreezeChat from "@Components/breezeChat/breezeChat.components";
import { useChatState } from "@Context/chatProvider";

const BreezeScrollableFeed = ({ setChats, newMessages, setNewMessages }) => {
	const { selectedChat } = useChatState();
	const chatContainerRef = useRef(null);
	const stickyMsgPillRef = useRef(null);
	const timeoutRef = useRef(null);
	const [showPill, setShowPill] = useState(false);

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
				backgroundImage:
					"url(https://res.cloudinary.com/dtjqyp0r2/image/upload/v1690138802/subtle-prism_2_iyfq9l.png)",
				maxHeight: "calc(100vh - 156px)",
				height: "calc(100vh - 156px)",
			}}>
			<div
				onScroll={onScrollMsg}
				className='w-95% mx-auto overflow-y-auto'
				style={{ maxHeight: "100%" }}
				ref={chatContainerRef}>
				<BreezeChat
					setChats={setChats}
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
