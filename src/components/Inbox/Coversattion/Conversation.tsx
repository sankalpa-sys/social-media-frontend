import {Empty} from "antd";
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import MainConversation from "./MainConversation";
import {useEffect, useRef, useState} from "react";
import {privateApi} from "../../../api/api.ts";
import {io} from "socket.io-client";
import {useUser} from "../../../context/userContext.ts";

function Conversation({selectedConversation}: {selectedConversation: any}) {
    const {user} = useUser()
    const chatFriend = selectedConversation?.members.find((item: any)=>item._id !== user._id)
    const [messages, setMessages] = useState([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [fetchError, setFetchError] = useState<string>("")
    const [arrivalMessage, setArrivalMessage] = useState<any>(null)
    const socket = useRef<any>()

    useEffect(()=> {
        socket.current = io(import.meta.env.VITE_SOCKET_URL)
        socket.current.on("getMessage", (data: any): void => {
            setArrivalMessage({
                sender: data?.senderId ,
                text: data?.text,
                createdAt: Date.now()
            })
        })
    },[])

   useEffect(()=> {
       arrivalMessage &&(
           // @ts-ignore
           setMessages((prev)=>[...prev, {
               sender: arrivalMessage?.sender,
               text: arrivalMessage?.text,
               createdAt: arrivalMessage?.createdAt
           }])
       )
   },[arrivalMessage, selectedConversation, socket])

    useEffect(()=> {
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers", (users: any)=> {
            console.log("users", users)
        })
    },[user])


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

    const addMessages = (newMessage:any) => {
        // @ts-ignore
        setMessages(prevState => [...prevState, newMessage])
    }
    if(!selectedConversation) return (
       <div className='h-screen flex  flex-col items-center justify-center'>
           <Empty />
           <p>No conversation selected</p>
       </div>
    )

    if(fetchError) return (
        <div>
            error!
        </div>
    )
    return (
        <div className='h-screen flex flex-col'>
            <ConversationHeader chatFriend={chatFriend}/>
            <div className='flex-grow overflow-y-auto flex flex-col-reverse no-scrollbar mt-10'>
                <MainConversation messages={messages} fetching={fetching} getMessages={getMessages}  selectedConversation={selectedConversation}/>
            </div>
            <ConversationFooter socket={socket} chatFriend={chatFriend} addMessages={addMessages} selectedConversation={selectedConversation}/>
        </div>
    );
}

export default Conversation;