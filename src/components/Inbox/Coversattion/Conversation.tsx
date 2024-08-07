import {Empty} from "antd";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import MainConversation from "./MainConversation";
import {useState} from "react";
import {privateApi} from "../../../api/api.ts";

function Conversation({selectedConversation}) {
    const [messages, setMessages] = useState([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<string>("")

    const getMessages = async() => {
        setFetching(true)
        setFetchError("")
        try{
            const res = await privateApi({
                url: `/message/${selectedConversation?._id}`,
                method: "GET"
            })
            console.log(res.data)
            setMessages(res.data)
        }catch (e) {

        }finally {
            setFetching(false)
        }
    }

    const addMessages = (newMessage) => {
        setMessages(prevState => [...prevState, newMessage])
    }

    console.log("selectedConversation", selectedConversation)
    if(!selectedConversation) return (
       <div className='h-screen flex  flex-col items-center justify-center'>
           <Empty />
           <p>No conversation selected</p>
       </div>
    )
    return (
        <div className='h-screen flex flex-col'>
            <ConversationHeader selectedConversation={selectedConversation}/>
            <div className='flex-grow overflow-y-auto flex flex-col-reverse no-scrollbar mt-10'>
                <MainConversation messages={messages} fetching={fetching} getMessages={getMessages}  selectedConversation={selectedConversation}/>
            </div>
            <ConversationFooter addMessages={addMessages} selectedConversation={selectedConversation}/>
        </div>
    );
}

export default Conversation;