import ConversationSidebar from "../../components/Inbox/ConversationSideBar/ConversationSidebar";
import Conversation from "../../components/Inbox/Coversattion/Conversation";
import {useCallback, useEffect, useState} from "react";
import {privateApi} from "../../api/api";

function Inbox() {
    const [conversations, setConversations] = useState([]);
    const [gettingConversations, setGettingConversations] = useState(false);
    const [conversationError, setConversationError] = useState('');
    const [selectedConversation, setSelectedConversation] = useState(null)
    useEffect(()=> {
        const getCoversations = async() => {
            setGettingConversations(true)
            setConversationError("")
          try{
              const res = await privateApi({
                  url: '/conversation',
                  method: 'GET',
              })
              setConversations(res.data)
          }catch (e) {
                setConversationError(e.response.data.message)
          }finally {
                setGettingConversations(false)
          }
        }
        getCoversations()
    },[])

    const handleSelectConversation = useCallback((conversation: any) => {
        setSelectedConversation(conversation);
    }, []);
    return (
        <div className='grid grid-cols-10'>
           <div className='col-span-3'>
               <ConversationSidebar handleSelectConversation={handleSelectConversation} conversations={conversations} gettingConversations={gettingConversations} conversationError={conversationError} />
           </div>
            <div className='col-span-7'>
                <Conversation selectedConversation={selectedConversation}/>
            </div>
        </div>
    );
}

export default Inbox;