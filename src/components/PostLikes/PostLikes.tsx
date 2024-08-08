import {privateApi} from "../../api/api";
import {useEffect, useState} from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Empty} from "antd";
import UserCard from "../UserCard/UserCard";

function PostLikes({id}: {id: string}) {
    const [likes, setLikes] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const followHandler = () => {

    }

    useEffect(()=> {
        const getAllLikes = async() => {
            setLoading(true)
            try{
                const res = await privateApi({
                    method: "GET",
                    url: `/post/likes/${id}`
                })
                setLikes(res?.data)
            }catch (e: any) {
                setError(e.message)
            }finally {
                setLoading(false)
            }
        }
        getAllLikes()

        return () => {
            setLikes([])
        }
    },[id])
    console.log("Likes", likes)
    if(loading) return <div>
        <div className='pt-4'>
            <LoadingSpinner title='please wait...'/>
        </div>
    </div>
    if(error) return <div>
        <Empty description={error}/>
    </div>
    if(likes.length === 0) return <div>
        <Empty description="No likes"/>
    </div>
    return (
        <div className='pb-10 space-y-3'>
            {likes.map((user: any)=> (
                <div>
                    <UserCard user={user} handleFollow={followHandler} showFollow={false} subLabel="New to instaclone"/>
                </div>
            ))}
        </div>
    );
}

export default PostLikes;