import {AudioOutlined, FileImageOutlined, HeartOutlined, MehOutlined} from "@ant-design/icons";

function ConversationFooter() {
    return (
        <div className='flex items-center justify-between space-x-4 border rounded-full py-2 pr-5 pl-3 fixed bottom-3 w-[56%] ml-5'>
            <MehOutlined style={{fontSize: "24px"}} />
            <input className='outline-none bg-transparent flex-1 ' type="text" placeholder='Message...'/>
            <div className="rightIcons space-x-4">
                <AudioOutlined style={{fontSize: "24px"}} />
                <FileImageOutlined style={{fontSize: "24px"}} />
                <HeartOutlined style={{fontSize: "24px"}} />
            </div>
        </div>
    );
}

export default ConversationFooter;