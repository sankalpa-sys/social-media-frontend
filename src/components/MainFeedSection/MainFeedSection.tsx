import SingleFeed from "../SingleFeed/SingleFeed.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";
import nodata from '../../assets/nodata.png'
import AddPost from "../AddPost/AddPost";
function MainFeedSection() {
    const [feeds, setFeeds] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    useEffect(()=> {
        const fetchFeeds = async() => {
            try{
                setError("")
                setLoading(true)
                const res = await axios.get("http://localhost:8000/api/post/", {
                    headers: {
                        "auth-token": `Bearer ${localStorage.getItem("auth-token")}`
                    }
                })
                setFeeds(res.data)
            }catch (e: any) {
                setError(e)
            }finally{
                setLoading(false)
            }
        }
        fetchFeeds()

    },[])

    console.log("feeds", feeds);

    if(loading) return (
        <div className='col-span-7 h-screen flex items-center justify-center'>
           <LoadingSpinner title="Loading feeds..."/>
        </div>
    )
    if(error) return <h1>Error: {error}</h1>
    if(!loading && !error && feeds.length === 0) return (
        <div className='col-span-7 overflow-y-scroll h-screen'>
           <div className="w-full flex items-center justify-center">
               <AddPost setFeeds={setFeeds}/>
           </div>
            <div className='col-span-7 h-screen flex flex-col items-center justify-start'>
                <img className='h-96 w-96' src={nodata} alt=""/>
                <div>
                    <h1 className='text-2xl font-semibold text-center pb-3'>No feeds found</h1>
                    <p className='text-sm'>Start following different people to see new posts and reels</p>
                </div>
            </div>
        </div>
    )
    return (
            <div className='col-span-7 overflow-y-scroll h-screen'>
                <div className="w-full flex items-center justify-center">
                    <AddPost setFeeds={setFeeds}/>
                </div>
                <div className='flex flex-col gap-y-8 py-10 items-center'>
                    {feeds.map((feed: any) => (
                        <SingleFeed setFeeds={setFeeds} key={feed._id} feed={feed}/>
                    ))}
                </div>
            </div>
    );
}

export default MainFeedSection;