import {useState} from "react";
import PostDetails from "../PostDetails/PostDetails.tsx";

function UserPosts({posts}: {posts: any[]}) {
    const [openPostDetails, setOpenDetailsModal] = useState<boolean>(false)
    const [selectedPost, setSelectedPost] = useState(null)
    return (
        <div className='grid grid-cols-3 gap-2'>
            {posts?.map((post) => (
                <div onClick={()=>{setOpenDetailsModal(true); setSelectedPost(post)}} key={post._id} className='h-72 bg-gray-950 w-auto'>
                    <img className='h-full w-full object-cover' src={post?.img} alt=""/>
                </div>
            ))}

            {openPostDetails && selectedPost && (
                <PostDetails post={selectedPost} openModal={openPostDetails} closeModal={()=>setOpenDetailsModal(false)} postId='2334'/>
            )}
        </div>
    );
}

export default UserPosts;