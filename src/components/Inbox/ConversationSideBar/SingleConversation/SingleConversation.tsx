function SingleConversation() {
    return (
        <div className='flex items-center space-x-2 hover:bg-gray-900 py-2 px-5 cursor-pointer'>
            <img src="https://images.pexels.com/photos/26732874/pexels-photo-26732874/free-photo-of-a-couple-in-love-embrace-in-the-woods.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                 className='h-12 w-12 rounded-full object-cover' alt=""/>
            <div>
                <h1 className='text-white text-sm font-semibold'>John Doe</h1>
                <p className='text-gray-400 text-xs'>Hello, how are you?</p>
            </div>
        </div>
    );
}

export default SingleConversation;