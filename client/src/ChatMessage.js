export default function ChatMessage({message}) {
    return (
        <div className="flex flex-row p-0.5">
            <img width="35px" src={message.profilepic}></img>
            <div className="text-rose-500 text-lg">{message.first_name}:</div>
            <div className="ml-2 text-lg text-blue-400">{message.text}</div>
            {/* <div className="text-xs">
                                    {message.created_at}
                                </div> */}
        </div>
    );
    
};
