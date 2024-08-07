import './Conversation.css'
import {useEffect, useState} from "react";
import {privateApi} from "../../../api/api.ts";
import {useUser} from "../../../context/userContext.ts";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.tsx";
function MainConversation({selectedConversation, getMessages, fetching, messages}) {
    const {user} = useUser()
    useEffect(()=> {
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