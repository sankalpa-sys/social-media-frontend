import SingleConversation from "./SingleConversation/SingleConversation";
import React from "react";

function ConversationSidebar({conversations, gettingConversations, conversationError}) {
    console.log("conversations",conversations)
    return (
        <div className='h-screen border-r overflow-y-scroll no-scrollbar'>
            <div className="header flex justify-between items-center px-5 py-10">
                <h1 className="text-lg font-semibold">Messages</h1>
                <p className='text-gray-400'>Requests</p>
            </div>
           <div className="conversations mt-8 space-y-3">
               {conversations.map((conversation, index)=> (
                  <React.Fragment key={index}>
                      <SingleConversation conversation={conversation}/>
                  </React.Fragment>
               ))}
           </div>
        </div>
    );
}

export default ConversationSidebar;