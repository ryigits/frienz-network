import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
export default function ChatBoard({ lastMessages,historicalMessages}) {
    const messagesEndRef = useRef();

    useEffect(() => {
        messagesEndRef.current.scrollTop = 0;
    }, [lastMessages]);

    return (
        <>
            <div
                ref={messagesEndRef}
                className="w-full overflow-y-auto bg-slate-200 h-60 border-4 border-red-400"
            >
                {lastMessages &&
                    lastMessages.map((message, index) => (
                        <div key={index}>
                            <ChatMessage message={message} />
                        </div>
                    ))}
                {historicalMessages &&
                    historicalMessages.map((message) => (
                        <div key={message.id}>
                            <ChatMessage message={message} />
                        </div>
                    ))}
            </div>
        </>
    );
}
