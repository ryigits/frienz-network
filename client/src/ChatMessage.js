import { Link } from "react-router-dom";

export default function ChatMessage({ message }) {
    return (
        <>
            <div className="flex flex-row flex-nowrap p-1">
                <div>
                    {message.profilepic && (
                        <Link to={`/users/${message.sender_id}`}>
                            <img width="35px" src={message.profilepic}></img>
                        </Link>
                    )}
                </div>
                <div className="flex flex-row p-0.5 grow">
                    <div className="grow">
                        <div className="text-rose-500 text-lg font-light italic">
                            {message.first_name && <>{message.first_name}:</>}
                        </div>
                        <div className="ml-2 text-lg  text-blue-400 grow">
                            {message.text}
                        </div>
                    </div>
                    <div className="text-xs self-end font-extralight italic text-gray-400">
                        {message.created_at &&
                            new Date(message.created_at)
                                .toString()
                                .slice(0, 24)}
                    </div>
                </div>
            </div>
        </>
    );
}
