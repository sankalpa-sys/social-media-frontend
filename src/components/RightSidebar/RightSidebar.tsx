import ProfileHeader from "./ProfileHeader";
import {useEffect, useState} from "react";
import {getUserName} from "../../utils";
import {privateApi} from "../../api/api";
import UserCard from "../UserCard/UserCard";


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

    const handleFollow = async (id: any) => {
       try {
           await privateApi({
               data: {
                  action: "follow"
               },
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
        <div className='hidden md:flex col-span-3 py-10 pr-10 pl-5 space-x-2'>

              <div className='h-10 w-10 animate-pulse bg-gray-500 rounded-full shrink-0'/>
              <div className='space-y-1 w-full'>
                  <div className='h-4 w-3/4 bg-gray-500 animate-pulse rounded-full'/>
                  <div className='h-4 w-1/2 bg-gray-500 animate-pulse rounded-full'/>
              </div>
        </div>
    )
    if(error) return <div></div>

    return (
        <div className='hidden md:block col-span-3 py-10 pr-10 pl-5'>
            <ProfileHeader/>
            <div className='flex items-center justify-between text-sm my-6'>
                <p className='text-gray-200'>Suggested for you</p>
                <p className='text-xs'>See All</p>
            </div>

            <div className='w-full space-y-6'>
                {suggestedUsers.map((user)=> (
                    <UserCard showFollow={true} subLabel='Suggested for you' user={user} handleFollow={handleFollow} key={user._id}/>
                ))}
            </div>
        </div>
    );
}

export default RightSidebar;