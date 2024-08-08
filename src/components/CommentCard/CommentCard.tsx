import {getUserName} from "../../utils.ts";
import {CheckCircleFilled, HeartOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


function CommentCard({comment}: {comment: any}) {
    const navigator = useNavigate()
    return (
        <div className='header px-5 md:px-0 flex justify-between items-start'>
            <div className='flex items-center space-x-2'>
                <img onClick={()=>navigator(`/profile/123`)} className='h-8 w-8 rounded-full object-cover cursor-pointer' src={comment?.user?.profilePicture} alt=""/>
                <div>
                    <div className='flex space-x-2 items-center'>
                        <p onClick={()=>navigator(`/profile/123`)} className='cursor-pointer hover:underline font-semibold'>{getUserName(comment?.user?.name)}</p>
                        <CheckCircleFilled className='text-blue-600' style={{fontSize: "10px"}} />
                        <p className=''>{comment?.comment}</p>
                    </div>
                    <p className='text-xs pt-0.5'>12h</p>
                </div>
            </div>
            <HeartOutlined
                style={{ fontSize: "10px", cursor: "pointer" }}
            />
        </div>
    );
}

export default CommentCard;