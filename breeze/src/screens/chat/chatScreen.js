import axios from "axios";
import { useEffect, useState } from "react";

const ChatScreen = () => {

    const [chats, setChats] = useState();

    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:5000/api/chat");
        setChats(data);
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            {
                chats?.map((chat) => {
                    return <div key={chat._id}>{chat.chatName}</div>
                })
            }
        </div>
    )
}

export default ChatScreen