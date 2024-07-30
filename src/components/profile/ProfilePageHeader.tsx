import {CheckCircleFilled, DownOutlined, EllipsisOutlined} from "@ant-design/icons";
import {getUserName} from "../../utils.ts";
function ProfilePageHeader({user}: {user: any}) {
    
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
                           <CheckCircleFilled className='text-blue-600' style={{fontSize: "20px"}} />
                       </div>
                       <div className='flex items-center space-x-1 bg-gray-600 max-w-fit px-2 py-1 rounded-md'>
                           <p className='text-sm'>Following</p>
                           <DownOutlined style={{fontSize: "12px"}} />
                       </div>
                       <div className='flex items-center space-x-1 bg-gray-600 max-w-fit px-2 py-1 rounded-md'>
                           <p className='text-sm'>Message</p>
                       </div>
                       <EllipsisOutlined className='' style={{fontSize: "24px"}} />
                   </div>
                   <div className='flex items-center space-x-10 py-3'>
                       <p>{user?.posts?.length} posts</p>
                       <p>{user?.followers?.length} followers</p>
                       <p>{user?.followings?.length} following</p>
                   </div>
                   <h4 className='text-sm font-semibold'>{user?.name}</h4>
                   <h3 className='text-sm'>Actor | Wrestler | Football lover</h3>
               </section>

           </div>
       </div>
    );
}

export default ProfilePageHeader;