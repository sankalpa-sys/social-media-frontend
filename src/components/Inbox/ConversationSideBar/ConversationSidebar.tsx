import SingleConversation from "./SingleConversation/SingleConversation";
import React from "react";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner.tsx";
import {Empty} from "antd";

function ConversationSidebar({handleSelectConversation,conversations, gettingConversations, conversationError}) {
    console.log("conversations",conversations)
    if(gettingConversations) return (
        <>
            <div className='w-full flex justify-start pt-10 px-5'>
                <div className='h-10 w-10 animate-pulse bg-gray-500 rounded-full shrink-0'/>
                <div className='space-y-1 w-full'>
                    <div className='h-4 w-3/4 bg-gray-500 animate-pulse rounded-full'/>
                    <div className='h-4 w-1/2 bg-gray-500 animate-pulse rounded-full'/>
                </div>
            </div>
            <div className='w-full flex justify-start pt-4 px-5'>
                <div className='h-10 w-10 animate-pulse bg-gray-500 rounded-full shrink-0'/>
                <div className='space-y-1 w-full'>
                    <div className='h-4 w-3/4 bg-gray-500 animate-pulse rounded-full'/>
                    <div className='h-4 w-1/2 bg-gray-500 animate-pulse rounded-full'/>
                </div>
            </div>
        </>
    )

    if(!gettingConversations && conversationError) return (
        <div>
            <p>Error getting conversations</p>
        </div>
    )

    if(!gettingConversations && !conversationError && conversations?.length === 0) return (
        <div className='h-screen flex  flex-col items-center justify-center'>
            <Empty />
            <p>No conversation found</p>
        </div>
    )
    return (
        <div className='h-screen border-r overflow-y-scroll no-scrollbar'>
            <div className="header flex justify-between items-center px-5 py-10">
                <h1 className="text-lg font-semibold">Messages</h1>
                <p className='text-gray-400'>Requests</p>
            </div>
           <div className="conversations mt-8 space-y-3">
               {conversations.map((conversation, index)=> (
                  <React.Fragment key={index}>
                     <div onClick={()=>handleSelectConversation(conversation)}>
                         <SingleConversation conversation={conversation}/>
                     </div>
                  </React.Fragment>
               ))}
           </div>
        </div>
    );
}

export default ConversationSidebar;