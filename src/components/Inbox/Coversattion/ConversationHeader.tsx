import {InfoCircleOutlined, PhoneOutlined, VideoCameraOutlined} from "@ant-design/icons";

function ConversationHeader() {
    return (
        <div className='flex items-center justify-between p-5 border-b'>
            <div className='flex items-center space-x-2'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://images.pexels.com/photos/17894672/pexels-photo-17894672/free-photo-of-portrait-of-woman-in-jacket.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""/>
                <p className='font-semibold'>John Doe</p>
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