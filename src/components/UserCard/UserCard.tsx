import {getUserName} from "../../utils";
import {useNavigate} from "react-router-dom";

function UserCard({user, handleFollow, subLabel, showFollow=true}: {user:any, handleFollow:any, subLabel:string, showFollow: boolean}) {
    const navigator = useNavigate()

    return (
        <div onClick={()=>navigator(`/profile/${user?._id}`)} key={user?._id} className='flex items-center space-x-3 justify-between cursor-pointer hover:scale-95 transition-transform duration-300 ease-in-out'>
            <div className='flex space-x-3 item-center'>
                <img className='h-10 w-10 rounded-full object-cover' src={user?.profilePicture} alt=""/>
                <div className='text-xs'>
                    <p className='text-sm'>{getUserName(user?.name)}</p>
                    <p className='text-xs'>{subLabel || ""}</p>
                </div>
            </div>
            {showFollow && (
                <p onClick={(e)=> {e.stopPropagation(); handleFollow(user._id)}} className='text-blue-500 text-xs font-semibold cursor-pointer hover:text-blue-600'>Follow</p>
            )}
        </div>
    );
}

export default UserCard;