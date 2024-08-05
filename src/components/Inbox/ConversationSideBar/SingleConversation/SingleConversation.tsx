import {useUser} from "../../../../context/userContext";

function SingleConversation({conversation}) {
    const {user} = useUser()
    const messagingPartner = conversation.members.find(member => member._id !== user._id)
    return (
        <div className='flex items-center space-x-2 hover:bg-gray-900 py-2 px-5 cursor-pointer'>
            <img src={messagingPartner?.profilePicture}
                 className='h-12 w-12 rounded-full object-cover' alt=""/>
            <div>
                <h1 className='text-white text-sm font-semibold'>{messagingPartner?.name}</h1>
                <p className='text-gray-400 text-xs'>Hello, how are you?</p>
            </div>
        </div>
    );
}

export default SingleConversation;