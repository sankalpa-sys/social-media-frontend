import {getUserName} from "../../utils";
import {Skeleton} from "antd";
import {useUser} from "../../context/userContext";
import {useNavigate} from "react-router-dom";

function ProfileHeader() {
    const navigator = useNavigate()
    const {user, loading, error} = useUser()
    if(loading) return <Skeleton avatar paragraph={{ rows: 2 }} />
    if(error) return <p>Error: {error}</p>
    return (
        <div className='flex items-center w-full space-x-4 justify-between'>
            <div className='flex items-center space-x-3 cursor-pointer'>
                <img className='h-10 w-10 rounded-full object-cover' src={user?.profilePicture} alt=""/>
                <div onClick={()=>navigator(`/profile/${user?._id}`)}>
                    <p>{getUserName(user?.name)}</p>
                    <p className='text-gray-200 text-xs'>{user?.name}</p>
                </div>
            </div>
            <p className='text-blue-500 text-xs font-semibold cursor-pointer hover:text-white'>Switch</p>
        </div>
    );
}

export default ProfileHeader;