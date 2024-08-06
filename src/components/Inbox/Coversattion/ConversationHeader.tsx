import {InfoCircleOutlined, PhoneOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {useUser} from "../../../context/userContext.ts";

function ConversationHeader({selectedConversation}) {
    const {user} = useUser()
    const chatFriend = selectedConversation?.members.filter((item: any)=>item._id !== user._id)[0]
    console.log("chat friend", chatFriend)
    return (
        <div className='flex items-center justify-between p-5 border-b'>
            <div className='flex items-center space-x-2'>
                <img className='h-12 w-12 rounded-full object-cover' src={chatFriend?.profilePicture} alt=""/>
                <p className='font-semibold'>{chatFriend?.name}</p>
            </div>

            <div className='flex items-center space-x-5'>
                <PhoneOutlined style={{fontSize: "24px"}} />
                <VideoCameraOutlined style={{fontSize: "24px"}} />
                <InfoCircleOutlined style={{fontSize: "24px"}} />

            </div>
        </div>
    );
}

export default ConversationHeader;