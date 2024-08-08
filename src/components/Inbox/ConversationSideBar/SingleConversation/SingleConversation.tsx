import {useUser} from "../../../../context/userContext";
import {getUserName} from "../../../../utils.ts";

function SingleConversation({conversation}: {conversation: any}) {
    const {user} = useUser()
    const messagingPartner = conversation.members.find((member: any) => member._id !== user._id)
    return (
        <div className='flex items-center space-x-2 hover:bg-gray-900 py-2 px-5 cursor-pointer'>
            <img src={messagingPartner?.profilePicture}
                 className='h-12 w-12 rounded-full object-cover' alt=""/>
            <div className='hidden md:block'>
                <h1 className='text-white text-sm font-semibold'>{messagingPartner?.name}</h1>
                <p className='text-gray-400 text-xs'>{getUserName(messagingPartner?.name)}</p>
            </div>
        </div>
    );
}

export default SingleConversation;