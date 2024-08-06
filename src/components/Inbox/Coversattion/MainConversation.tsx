import './Conversation.css'
import {useEffect, useState} from "react";
import {privateApi} from "../../../api/api.ts";
import {useUser} from "../../../context/userContext.ts";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.tsx";
function MainConversation({selectedConversation}) {
    const {user} = useUser()
    const [messages, setMessages] = useState([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<string>("")

    useEffect(()=> {
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

        getMessages()
    },[selectedConversation])
    if(fetching) return (
        <div className='h-full  flex justify-center pt-5'>
            <LoadingSpinner title='fetching messages...'/>
        </div>
    )
    return (
        <div className='space-y-1 px-5 pb-20 flex flex-col h-full justify-end'>
            {messages?.map((message, index) => (
                <div key={index} className={`message ${message.sender === user._id ? 'sent' : 'received'}`}>
                    {message?.text}
                </div>
            ))}
        </div>
    );
}

export default MainConversation;