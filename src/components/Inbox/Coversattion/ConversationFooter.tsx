import {AudioOutlined, FileImageOutlined, HeartOutlined, MehOutlined} from "@ant-design/icons";
import { useState} from "react";
import {privateApi} from "../../../api/api.ts";
import {useUser} from "../../../context/userContext.ts";

interface IProps{selectedConversation: any, addMessages: any, chatFriend: any, socket: any}

function ConversationFooter({selectedConversation, addMessages, chatFriend, socket}: IProps) {
    const {user} = useUser()
    const [chat, setChat] = useState<string>("")
    const handleSendMessage = async(e:any) => {
        e.preventDefault()
        socket.current.emit("sendMessage",{
            senderId: user._id,
            receiverId: chatFriend?._id,
            text: chat
        })
        try{
            const res = await privateApi({
                url: "/message",
                method: "POST",
                data: {
                    conversationId: selectedConversation?._id,
                    sender: user?._id,
                    text: chat
                }
            })
            addMessages(res.data)
            setChat("")
        }catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='flex items-center justify-between space-x-4 border rounded-full py-2 pr-5 pl-3 fixed bottom-3 md:w-[56%] w-[70%] ml-5 bg-black'>
            <MehOutlined style={{fontSize: "24px"}} />
            <form onSubmit={handleSendMessage} className='flex-1 h-full'>
                <input value={chat} onChange={(e)=>setChat(e.target.value)} className='outline-none bg-transparent w-full h-full bg-red-400 ' type="text" placeholder='Message...'/>
            </form>
            <div className="rightIcons space-x-4">
                <AudioOutlined style={{fontSize: "24px"}} />
                <FileImageOutlined style={{fontSize: "24px"}} />
                <HeartOutlined style={{fontSize: "24px"}} />
            </div>
        </div>
    );
}

export default ConversationFooter;