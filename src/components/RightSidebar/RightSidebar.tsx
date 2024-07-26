const suggestedUsers = [
    {
        username: "john_cena",
        img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
        label: "Suggested for you"
    },
    {
        username: "under_taker",
        img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
        label: "Suggested for you"
    },
    {
        username: "dave_batista",
        img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
        label: "Suggested for you"
    },
    {
        username: "roman_reign",
        img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
        label: "Suggested for you"
    },{
        username: "_jbl_",
        img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
        label: "Suggested for you"
    },


]
function RightSidebar() {
    return (
        <div className='col-span-3 py-10 pr-10 pl-5'>
            <div className='flex items-center w-full space-x-4 justify-between'>
                <div className='flex items-center space-x-3 cursor-pointer'>
                    <img className='h-10 w-10 rounded-full object-cover' src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=800" alt=""/>
                    <div>
                        <p>_sankalpa_neupane_</p>
                        <p className='text-gray-200 text-xs'>Sankalpa Neupane</p>
                    </div>
                </div>
                <p className='text-blue-500 text-xs font-semibold cursor-pointer hover:text-white'>Switch</p>
            </div>

            <div className='flex items-center justify-between text-sm my-6'>
                <p className='text-gray-200'>Suggested for you</p>
                <p className='text-xs'>See All</p>
            </div>

            <div className='w-full space-y-6'>
                {suggestedUsers.map((user)=> (
                    <div key={user.username} className='flex items-center space-x-3 justify-between'>
                        <div className='flex space-x-3 item-center'>
                            <img className='h-10 w-10 rounded-full object-cover' src={user.img} alt=""/>
                            <div className='text-xs'>
                                <p className='text-sm'>{user.username}</p>
                                <p className='text-xs'>{user.label}</p>
                            </div>
                        </div>
                        <p className='text-blue-500 text-xs font-semibold cursor-pointer hover:text-white'>Follow</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RightSidebar;