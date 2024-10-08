import ProfilePageHeader from "../../components/profile/ProfilePageHeader.tsx";
import {Tabs} from "antd";
import UserPosts from "../../components/profile/UserPosts.tsx";
import UserReels from "../../components/profile/UserReels.tsx";
import UserTags from "../../components/profile/UserTags.tsx";
import {AppstoreOutlined, TagsOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {privateApi} from "../../api/api.ts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.tsx";

function UserProfile() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const params = useParams()
    const getUserProfile = async() => {
        setLoading(true)
        try{
            const res = await privateApi({
                method: "GET",
                url:`/user/${params.id}`
            })
            setUser(res.data)
        }catch (e: any) {
            setError(e.message)
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        getUserProfile()
    },[params.id])
    const onTabChange = () => {

    }

    if(loading) return (
        <div className='bg-black text-white grid grid-cols-12 w-full'>
            <div className='h-screen w-full flex items-center justify-center bg-black text-white col-span-10'>
                <LoadingSpinner title="Please wait..."/>
            </div>
        </div>
    )
    if(error){
        return (
            <div>
                error
            </div>
        )
    }
    return (
            <div className='bg-black text-white h-screen max-w-3xl mx-auto pt-10 overflow-y-scroll scrollbar-hide pb-5'>
                <ProfilePageHeader getUserProfile={getUserProfile} user = {user}/>
                <div className='md:py-20 pt-10  px-5 md:px-0'>
                    <Tabs
                        tabBarGutter={50}
                        style={{backgroundColor: "black", color: "white"}}
                        onChange={onTabChange}
                        items={
                            [
                                {
                                    label: <div className='text-white flex items-center'>
                                        <AppstoreOutlined className='text-white' />
                                        <p>Posts</p>
                                    </div>,
                                    key: "posts",
                                    children: <UserPosts posts={user?.posts}/>,
                                },
                                {
                                    label:  <div className='text-white flex items-center'>
                                        <VideoCameraOutlined className='text-white' />
                                        <p>Reels</p>
                                    </div>,
                                    key: "reels",
                                    children: <UserReels/>,
                                },
                                {
                                    label:  <div className='text-white flex items-center'>
                                        <TagsOutlined className='text-white' />
                                        <p>Tags</p>
                                    </div>,
                                    key: 'tags',
                                    children: <UserTags/>,
                                }
                            ]
                        }
                    />
                </div>
            </div>
    );
}

export default UserProfile;