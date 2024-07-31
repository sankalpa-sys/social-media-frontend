import {
    CheckCircleFilled,
    DownOutlined,
    EllipsisOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import {getUserName} from "../../utils.ts";
import {useUser} from "../../context/userContext";
import {useState} from "react";
import {Modal} from "antd";
import EditProfile from "./EditProfile.tsx";
function ProfilePageHeader({user, getUserProfile}: {user: any, getUserProfile: ()=>void}) {
    const [openEditProfileModal, setOpenEditProfileModal] = useState<boolean>(false)
    const {user: currentUser} = useUser()
    return (
       <div>
           <div className='flex items-center space-x-5'>
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
                               <div className='flex items-center space-x-1 bg-cyan-600 max-w-fit px-2 py-1 rounded-md cursor-pointer'>
                                   <p className='text-sm'>Following</p>
                                   <DownOutlined style={{fontSize: "12px"}} />
                               </div>
                               <div className='flex items-center space-x-1 bg-teal-600 max-w-fit px-2 py-1 rounded-md cursor-pointer'>
                                   <p className='text-sm'>Message</p>
                                   <MessageOutlined style={{fontSize: "12px"}} />
                               </div>
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
               <Modal footer={null} centered open={openEditProfileModal} onCancel={()=>setOpenEditProfileModal(false)}>
                  <EditProfile setOpenEditProfileModal={setOpenEditProfileModal} getUserProfile={getUserProfile} user={user}/>
               </Modal>
           )}
       </div>
    );
}

export default ProfilePageHeader;