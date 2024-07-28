import {
    CheckCircleFilled,
    CommentOutlined,
    EllipsisOutlined, FireOutlined,
    HeartFilled,
    SendOutlined
} from "@ant-design/icons";
import {getUserName} from "../../utils.ts";
import {Button, Modal} from "antd";
import {useState} from "react";
import axios from "axios";
import {useUser} from "../../context/userContext";

function SingleFeed({feed, setFeeds}: {feed: any}) {
    const {user} = useUser()
    const [openFeedSettingsModal, setOpenFeedSettingsModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const handleDelete = async () => {
       if(deleting) return;
        setDeleting(true)
        try{
            await axios.delete(`http://localhost:8000/api/post/${feed?._id}`, {headers: {
                    "auth-token": `Bearer ${localStorage.getItem("auth-token")}`
                }})
            setFeeds((prevFeeds) => prevFeeds.filter((f) => String(f._id) !== String(feed._id)))
        }catch (e) {
            console.log(e)
        }finally {
            setDeleting(false)
            setOpenFeedSettingsModal(false)
        }
    }

    console.log("user", user)
    console.log("feed",feed)
    return (
        <div className='border-b-[0.5px] border-gray-500 select-none '>
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
                {(String(user?._id) === String(feed?.user?._id) || user?.isAdmin) && (
                    <EllipsisOutlined
                        onClick={() => setOpenFeedSettingsModal(true)}
                        style={{ fontSize: "20px" }}
                    />
                )}
            </div>
            <div className='post'>
                <img className='h-[30rem] w-[26rem] object-cover rounded-md mt-4' src={feed?.img} alt=""/>
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

            <Modal
                className='feedModal'
                closable={false}
                centered
                open={openFeedSettingsModal}
                footer={[
                    <Button type='primary' onClick={()=>setOpenFeedSettingsModal(false)}>Cancel</Button>
                ]}
            >
                <div className='space-y-2'>
                    <p className='py-2 cursor-pointer hover:bg-gray-100 text-base pl-4 rounded-md'>Edit</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-100 text-base pl-4 rounded-md'>Save</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-100 text-base pl-4 rounded-md'>Hide like counts to other</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-100 text-base pl-4 rounded-md'>Turn off commenting</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-100 text-base pl-4 rounded-md'>Add to favorites</p>
                    <p onClick={handleDelete} className={`py-2 cursor-pointer hover:bg-red-600 hover:text-white text-base pl-4 rounded-md ${deleting && 'animate-pulse'}`}>Delete</p>
                </div>
            </Modal>
        </div>
    );
}

export default SingleFeed;