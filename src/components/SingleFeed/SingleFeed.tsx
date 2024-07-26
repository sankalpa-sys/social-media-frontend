import {
    CheckCircleFilled,
    CommentOutlined,
    EllipsisOutlined, FireOutlined,
    HeartFilled,
    SendOutlined
} from "@ant-design/icons";
import {getUserName} from "../../utils.ts";

function SingleFeed({feed}: {feed: any}) {
    return (
        <div className='border-b-[0.5px] border-gray-500 '>
            <div className='header flex justify-between items-start'>
                <div className='flex items-center space-x-2'>
                    <img className='h-8 w-8 rounded-full object-cover' src="https://images.pexels.com/photos/3619947/pexels-photo-3619947.jpeg?auto=compress&cs=tinysrgb&w=800" alt=""/>
                    <div>
                       <div className='flex space-x-1 text-xs items-center'>
                           <p className='text-sm'>{getUserName(feed?.user?.name)}</p>
                           <CheckCircleFilled className='text-blue-600' style={{fontSize: "10px"}} />
                           <p>.</p>
                           <p>45m</p>
                       </div>
                        <p className='text-xs'>Nepal</p>
                    </div>
                </div>
                <EllipsisOutlined style={{fontSize: "20px"}} />
            </div>
            <div className='post'>
                <img className='h-[30rem] w-[26rem] object-cover rounded-md mt-4' src="https://images.pexels.com/photos/2690807/pexels-photo-2690807.jpeg?auto=compress&cs=tinysrgb&w=800" alt=""/>
            </div>
            <div className='footer py-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        <HeartFilled style={{fontSize: "24px", cursor:"pointer"}} />
                        <CommentOutlined style={{fontSize: "24px", cursor:"pointer"}} />
                        <SendOutlined style={{fontSize: "24px" , cursor:"pointer"}} />
                    </div>
                    <FireOutlined style={{fontSize: "24px", cursor:"pointer"}} />
                </div>
                <p className='pt-4 text-sm font-semibold'>{feed?.likes?.length} likes</p>
                <div className='flex items-center space-x-1 py-1'>
                    <p className='text-xs font-semibold'>{getUserName(feed?.user?.name)}</p>
                    <CheckCircleFilled className='text-blue-600' style={{fontSize: "10px"}} />
                    <p className='text-xs'>{feed?.desc}</p>
                </div>
                <p className='text-gray-400 text-xs py-1'>View all 3 comments</p>
                <p className='text-gray-400 text-xs'>Add a comment...</p>
            </div>
        </div>
    );
}

export default SingleFeed;