import './Conversation.css'
function MainConversation() {
    const messages = [
        {
            sender: 'me',
            message: 'Hey!!'
        },
        {
            sender: 'me',
            message: 'How are you??'
        },
        {
            sender: 'you',
            message: 'I am good, how about you??'
        },
        {
            sender: 'me',
            message: 'I am also good'
        },
        {
            sender: 'you',
            message: 'Nice to hear that'
        },
        {
            sender: 'me',
            message: 'Yeah'
        },
        {
            sender: 'me',
            message: 'Hey!!'
        },
        {
            sender: 'me',
            message: 'How are you??'
        },
        {
            sender: 'you',
            message: 'I am good, how about you??'
        },
        {
            sender: 'me',
            message: 'I am also good'
        },
        {
            sender: 'you',
            message: 'Nice to hear that'
        },
        {
            sender: 'me',
            message: 'Yeah'
        },
        {
            sender: 'me',
            message: 'Hey!!'
        },
        {
            sender: 'me',
            message: 'How are you??'
        },
        {
            sender: 'you',
            message: 'I am good, how about you??'
        },
        {
            sender: 'me',
            message: 'I am also good'
        },
        {
            sender: 'you',
            message: 'Nice to hear that'
        },
        {
            sender: 'me',
            message: 'Yeah'
        },
        {
            sender: 'me',
            message: 'Hey!!'
        },
        {
            sender: 'me',
            message: 'How are you??'
        },
        {
            sender: 'you',
            message: 'I am good, how about you??'
        },
        {
            sender: 'me',
            message: 'I am also good'
        },
        {
            sender: 'you',
            message: 'Nice to hear that'
        },
        {
            sender: 'me',
            message: 'Yeah'
        },
        {
            sender: 'me',
            message: 'Hey!!'
        },
        {
            sender: 'me',
            message: 'How are you??'
        },
        {
            sender: 'you',
            message: 'I am good, how about you??'
        },
        {
            sender: 'me',
            message: 'I am also good'
        },
        {
            sender: 'you',
            message: 'Nice to hear that'
        },
        {
            sender: 'me',
            message: 'Yeah'
        },
        {
            sender: 'me',
            message: 'Hey!!'
        },
        {
            sender: 'me',
            message: 'How are you??'
        },
        {
            sender: 'you',
            message:
                'I am good, how about you??'
        },

    ]
    return (
        <div className='space-y-1 px-5 pb-20 flex flex-col h-full justify-end'>
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}>
                    {message.message}
                </div>
            ))}
        </div>
    );
}

export default MainConversation;