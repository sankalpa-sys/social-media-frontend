import ConversationSidebar from "../../components/Inbox/ConversationSideBar/ConversationSidebar";
import Conversation from "../../components/Inbox/Coversattion/Conversation";

function Inbox() {
    return (
        <div className='grid grid-cols-10'>
           <div className='col-span-3'>
               <ConversationSidebar/>
           </div>
            <div className='col-span-7'>
                <Conversation/>
            </div>
        </div>
    );
}

export default Inbox;