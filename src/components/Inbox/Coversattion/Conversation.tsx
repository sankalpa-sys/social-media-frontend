import {Empty} from "antd";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";

function Conversation() {
    const selectedConversation = "s";
    if(!selectedConversation) return (
       <div className='h-screen flex  flex-col items-center justify-center'>
           <Empty />
           <p>No conversation selected</p>
       </div>
    )
    return (
        <div className='h-screen relative'>
            <ConversationHeader/>
            <div className='flex-1 bg-red-400'>

            </div>
            <ConversationFooter/>
        </div>
    );
}

export default Conversation;