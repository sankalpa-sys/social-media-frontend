import {useEffect, useState} from "react";
import {getUserName} from "../../utils";
import {Skeleton} from "antd";
import {useUser} from "../../context/userContext";
import {privateApi} from "../../api/api";
import {useNavigate} from "react-router-dom";

function ProfileHeader() {
    const navigator = useNavigate()
    const {user, setUser} = useUser()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    useEffect(()=> {
        const getUserProfile = async() => {
            setLoading(true)
            setError("")
            try{
          const res = await privateApi({
                    method: "GET",
                    url: "/user/profile"
                })
                setUser(res.data);
            }catch (e) {
                setError(e)
            }finally {
                setLoading(false)
            }
        }
        getUserProfile()
    },[])
    console.log('user', user)
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