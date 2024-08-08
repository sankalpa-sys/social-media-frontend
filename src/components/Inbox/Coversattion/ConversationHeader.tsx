import {InfoCircleOutlined, PhoneOutlined, VideoCameraOutlined} from "@ant-design/icons";

function ConversationHeader({ chatFriend}: {chatFriend: any}) {
    return (
        <div className='flex items-center justify-between p-5 border-b'>
            <div className='flex items-center space-x-2'>
                <img className='md:size-12 size-8 rounded-full object-cover' src={chatFriend?.profilePicture} alt=""/>
                <p className='font-semibold md:text-base text-sm'>{chatFriend?.name}</p>
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