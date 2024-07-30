function UserPosts({posts}: {posts: any[]}) {
    return (
        <div className='grid grid-cols-3 gap-2'>
            {posts?.map((post) => (
                <div key={post._id} className='h-72 bg-gray-950 w-auto'>
                    <img className='h-full w-full object-cover' src={post?.img} alt=""/>
                </div>
            ))}
        </div>
    );
}

export default UserPosts;