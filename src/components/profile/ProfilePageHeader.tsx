import {
    CheckCircleFilled,
    DownOutlined,
    EllipsisOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import {getUserName} from "../../utils.ts";
import {useUser} from "../../context/userContext";
import {useLayoutEffect, useState} from "react";
import {Button, Modal, Popconfirm} from "antd";
import EditProfile from "./EditProfile.tsx";
import {privateApi} from "../../api/api.ts";
import {useToggleCurrentUser} from "../../context/toggleCurrentUser.ts";
import {useNavigate} from "react-router-dom";
function ProfilePageHeader({user, getUserProfile}: {user: any, getUserProfile: ()=>void}) {
    const {setToggler, toggler} = useToggleCurrentUser()
    const [openEditProfileModal, setOpenEditProfileModal] = useState<boolean>(false)
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const {user: currentUser} = useUser()
    const navigator = useNavigate()

    useLayoutEffect(()=> {
        const isUserBeingFollowed = currentUser?.followings.includes(user?._id)
        setIsFollowing(isUserBeingFollowed)
    },[toggler])

    const handleFollowActions = async() => {
        setLoading(true)
        try{
             await privateApi({
                url: `/follower/follow/${user._id}`,
                data:{
                    action: isFollowing ? "unfollow" : "follow",
                },
                method: "POST",
            })
            getUserProfile()
            setToggler(!toggler)

        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    const handleMessage = async () => {
        try{
            await privateApi({
                url: '/conversation',
                method: "POST",
                data: {
                    senderId: currentUser?._id,
                    receiverId: user?._id
                }
            })
            navigator("/inbox")
        }catch (e:any) {
            console.log(e)
           if(e?.response?.data?.redirect){
               navigator("/inbox")
           }
        }
    }
    return (
       <>
           <div className='flex flex-col md:flex-row items-center md:space-x-5 space-y-5'>
               <div className='h-48 w-48 rounded-full'>
                   <img className="h-full w-full rounded-full object-cover" src={user?.profilePicture} alt=""/>
               </div>
               <section>
                   <div className='flex space-x-3'>
                       <div className='flex items-center space-x-2'>
                           <h2 className='text-lg'>{getUserName(user?.name)}</h2>
                           <CheckCircleFilled className='text-blue-600' style={{fontSize: "15px"}} />
                       </div>
                       {currentUser?._id === user?._id ? (
                           <div onClick={()=>setOpenEditProfileModal(true)} className='flex items-center space-x-1 bg-green-600 max-w-fit px-2 py-1 rounded-md cursor-pointer'>
                               <p className='text-sm'>Edit profile</p>
                           </div>
                       ):(
                           <div className='flex items-center space-x-2'>
                               {isFollowing ? (
                                   <Popconfirm
                                       title="Unfollow"
                                       description="Are you sure to unfollow this user?"
                                       onConfirm={handleFollowActions}
                                       okText="Yes"
                                       cancelText="No"
                                   >
                                       <Button loading={loading} disabled={loading} iconPosition='end' type='primary' danger icon={<DownOutlined/>}>
                                           Unfollow
                                       </Button>
                                   </Popconfirm>
                               ): (
                                   <Button loading={loading} disabled={loading} onClick={handleFollowActions} iconPosition='end' type='primary' icon={<DownOutlined/>}>
                                       Follow
                                   </Button>
                               )}
                               <Button onClick={handleMessage} type='default' icon={<MessageOutlined/>}>
                                   Message
                               </Button>
                           </div>
                       )}

                       <EllipsisOutlined className='' style={{fontSize: "24px"}} />
                   </div>
                   <div className='flex items-center space-x-10 py-3'>
                       <p>{user?.posts?.length} posts</p>
                       <p>{user?.followers?.length} followers</p>
                       <p>{user?.followings?.length} following</p>
                   </div>
                   <h4 className='text-sm font-semibold'>{user?.name}</h4>
                   <h3 className='text-sm'>{user?.bio}</h3>
               </section>

           </div>
           {openEditProfileModal && (
               <Modal footer={null} style={{left:"75px"}} centered open={openEditProfileModal} onCancel={()=>setOpenEditProfileModal(false)}>
                  <EditProfile setOpenEditProfileModal={setOpenEditProfileModal} getUserProfile={getUserProfile} user={user}/>
               </Modal>
           )}
       </>
    );
}

export default ProfilePageHeader;