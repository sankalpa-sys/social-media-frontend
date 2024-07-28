import ProfileHeader from "./ProfileHeader";
import {useEffect, useState} from "react";
import {getUserName} from "../../utils";
import {privateApi} from "../../api/api";


function RightSidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    useEffect(()=> {
        fetchSuggestedUsers()
    },[])

    const fetchSuggestedUsers = async() => {
        setLoading(true)
        setError("")
        try{
            const res = await privateApi({
                method: "GET",
                url: "/user/suggested-users"
            })
            setSuggestedUsers(res.data)
            console.log("res", res.data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    const handleFollow = async (id) => {
       try {
           await privateApi({
               method: "POST",
               url: `/follower/follow/${id}`
           })

           const newUsers = suggestedUsers.filter((user)=> String(user._id)!==id)
           setSuggestedUsers(newUsers)
       }catch (e) {
           setError(e)
       }

    }

    if(loading) return (
        <div className='col-span-3 py-10 pr-10 pl-5 flex space-x-2'>

              <div className='h-10 w-10 animate-pulse bg-gray-500 rounded-full shrink-0'/>
              <div className='space-y-1 w-full'>
                  <div className='h-4 w-3/4 bg-gray-500 animate-pulse rounded-full'/>
                  <div className='h-4 w-1/2 bg-gray-500 animate-pulse rounded-full'/>
              </div>
        </div>
    )
    if(error) return <div></div>

    return (
        <div className='col-span-3 py-10 pr-10 pl-5'>
            <ProfileHeader/>
            <div className='flex items-center justify-between text-sm my-6'>
                <p className='text-gray-200'>Suggested for you</p>
                <p className='text-xs'>See All</p>
            </div>

            <div className='w-full space-y-6'>
                {suggestedUsers.map((user)=> (
                    <div key={user?._id} className='flex items-center space-x-3 justify-between'>
                        <div className='flex space-x-3 item-center'>
                            <img className='h-10 w-10 rounded-full object-cover' src={user?.profilePicture} alt=""/>
                            <div className='text-xs'>
                                <p className='text-sm'>{getUserName(user?.name)}</p>
                                <p className='text-xs'>Suggested for you</p>
                            </div>
                        </div>
                        <p onClick={()=> handleFollow(user._id)} className='text-blue-500 text-xs font-semibold cursor-pointer hover:text-white'>Follow</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RightSidebar;