import {Empty} from "antd";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import MainConversation from "./MainConversation";

function Conversation() {
    const selectedConversation = "s";
    if(!selectedConversation) return (
       <div className='h-screen flex  flex-col items-center justify-center'>
           <Empty />
           <p>No conversation selected</p>
       </div>
    )
    return (
        <div className='h-screen flex flex-col'>
            <ConversationHeader/>
            <div className='flex-grow overflow-y-auto flex flex-col-reverse no-scrollbar mt-10'>
                <MainConversation/>
            </div>
            <ConversationFooter/>
        </div>
    );
}

export default Conversation;