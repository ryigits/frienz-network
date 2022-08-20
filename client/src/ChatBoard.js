import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
export default function ChatBoard({ lastMessages}) {
    const messagesEndRef = useRef();

    useEffect(() => {
        messagesEndRef.current.scrollTop = 0;
    }, [lastMessages]);

    return (
        <>
            <div
                ref={messagesEndRef}
                className="w-full overflow-x-hidden bg-slate-200 h-80 border-4 border-red-400 scrollbar-thin scrollbar-thumb-rose-700 scrollbar-track-sky-200 hover:scrollbar-thumb-orange-400 overflow-y-scroll"
            >
                {lastMessages &&
                    lastMessages.map((message, index) => (
                        <div key={index}>
                            <ChatMessage message={message} />
                        </div>
                    ))}
            </div>
        </>
    );
}
