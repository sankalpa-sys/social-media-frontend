import {
    CheckCircleFilled,
    CommentOutlined,
    EllipsisOutlined, FireOutlined,
    HeartFilled, HeartOutlined,
    SendOutlined
} from "@ant-design/icons";
import {getTimeAgoGreatestUnit, getUserName, likeAndUnlikeHandler} from "../../utils.ts";
import {Button, Divider, Image, Modal} from "antd";
import {useState} from "react";
import {useUser} from "../../context/userContext";
import {privateApi} from "../../api/api";
import { useRef } from 'react';
// @ts-ignore
import useDoubleClick from 'use-double-click';
import PostLikes from "../PostLikes/PostLikes";
import {useNavigate} from "react-router-dom";
import PostDetails from "../PostDetails/PostDetails.tsx";

function SingleFeed({feed, setFeeds}: {feed: any, setFeeds: any}) {
    const navigator = useNavigate()
    const imageRef = useRef<any>()
    const {user} = useUser()
    const [openFeedSettingsModal, setOpenFeedSettingsModal] = useState<boolean>(false);
    const [openLikeModal, setOpenLikeModal] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [openFeedDetails, setOpenFeedDetails] = useState<boolean>(false);
    const handleDelete = async () => {
       if(deleting) return;
        setDeleting(true)
        try{
            await privateApi({
                method: "DELETE",
                url: `/post/${feed._id}`
            })
            setFeeds((prevFeeds: any) => prevFeeds.filter((f:any) => String(f._id) !== String(feed._id)))
        }catch (e) {
            console.log(e)
        }finally {
            setDeleting(false)
            setOpenFeedSettingsModal(false)
        }
    }

    const handleLike = () => {
       likeAndUnlikeHandler(user,feed, setFeeds)
    }

    useDoubleClick({
        onDoubleClick: () => {
            // @ts-ignore
            !feed.likes.includes(user?._id) ? handleLike() : ()=> {}
        },
        ref: imageRef,
        latency: 250
    });

    const toggleLikeModal = (value: boolean) => {
        setOpenLikeModal(value);
    }
    return (
        <div className='border-b-[0.5px] border-gray-500 select-none'>
            <div className='header px-5 md:px-0 flex justify-between items-start'>
                <div className='flex items-center space-x-2'>
                    <img onClick={()=>navigator(`/profile/${feed?.user?._id}`)} className='h-8 w-8 rounded-full object-cover cursor-pointer' src={feed?.user?.profilePicture} alt=""/>
                    <div>
                       <div className='flex space-x-1 text-xs items-center'>
                           <p onClick={()=>navigator(`/profile/${feed?.user?._id}`)} className='text-sm cursor-pointer hover:underline'>{getUserName(feed?.user?.name)}</p>
                           <CheckCircleFilled className='text-blue-600' style={{fontSize: "10px"}} />
                           <p>.</p>
                           <p>{getTimeAgoGreatestUnit(feed?.createdAt)}</p>
                       </div>
                        <p className='text-xs'>{feed?.city ? feed?.city + "," : ""} {feed?.country || "Nepal"}</p>
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
                <div ref={imageRef} className='w-[26rem] h-[30rem] mt-4 bg-black shadow-sm shadow-gray-400'>
                    <Image
                        preview={false}
                        width={"100%"}
                        height={"100%"}
                        src={feed?.img}
                    />
                </div>
            </div>
            <div className='footer py-6 px-5 md:px-0'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4'>
                        {feed.likes.includes(user?._id) ? (
                            <HeartFilled onClick={handleLike} style={{ fontSize: '24px', cursor: 'pointer', color: 'red' }} />
                        ) : (
                            <HeartOutlined onClick={handleLike} style={{ fontSize: '24px', cursor: 'pointer' }} />
                        )}
                        <CommentOutlined style={{fontSize: "24px", cursor:"pointer"}} />
                        <SendOutlined style={{fontSize: "24px" , cursor:"pointer"}} />
                    </div>
                    <FireOutlined style={{fontSize: "24px", cursor:"pointer"}} />
                </div>
                <p onClick={()=>toggleLikeModal(true)} className='pt-4 text-sm font-semibold cursor-pointer'>{feed?.likes?.length} {feed?.likes?.length === 1 ? "like": "likes"}</p>
                <div className='flex items-center space-x-1 py-1'>
                    <p className='text-xs font-semibold'>{getUserName(feed?.user?.name)}</p>
                    <CheckCircleFilled className='text-blue-600' style={{fontSize: "10px"}} />
                    <p className='text-xs'>{feed?.desc}</p>
                </div>
                <p onClick={()=>setOpenFeedDetails(true)} className='text-gray-400 text-xs py-1 hover:underline hover:opacity-95 cursor-pointer'>View all {feed?.comments?.length ?? 0} comments</p>
                <p onClick={()=>setOpenFeedDetails(true)} className='text-gray-400 text-xs cursor-pointer'>Add a comment...</p>
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
                <div className='space-y-2 pb-10'>
                    <p className='py-2 cursor-pointer hover:bg-gray-500 text-base pl-4 rounded-md'>Edit</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-500 text-base pl-4 rounded-md'>Save</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-500 text-base pl-4 rounded-md'>Hide like counts to other</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-500 text-base pl-4 rounded-md'>Turn off commenting</p>
                    <p className='py-2 cursor-pointer hover:bg-gray-500 text-base pl-4 rounded-md'>Add to favorites</p>
                    <p onClick={handleDelete} className={`py-2 cursor-pointer hover:bg-red-600 hover:text-white text-base pl-4 rounded-md ${deleting && 'animate-pulse'}`}>Delete</p>
                </div>
            </Modal>

            {openLikeModal && (
                <Modal
                    className="custom-modal"
                    // bodyStyle={{backgroundColor: "black"}}
                    maskClosable={true}
                    closable={false}
                    centered
                    open={openLikeModal}
                    footer={[
                        <Button type='primary' onClick={()=>toggleLikeModal(false)}>Done</Button>
                    ]}
                >
                    <div className='max-h-[50vh] min-h-[30vh] overflow-y-scroll scrollbar-hide'>
                        <p className='font-semibold text-center text-lg'>Likes</p>
                        <Divider style={{backgroundColor:"white"}}/>
                        <PostLikes key={openLikeModal ? feed?._id : null} id={feed?._id}/>
                    </div>
                </Modal>

            )}

            {openFeedDetails && (
                <PostDetails post={feed} openModal={openFeedDetails} closeModal={()=>setOpenFeedDetails(false)}/>
            )}

        </div>
    );
}

export default SingleFeed;