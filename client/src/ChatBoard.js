export default function ChatBoard({ lastMessages }) {
    return (
        <>
            <div className="w-full bg-slate-200 h-40 border-4 border-red-400">
                {lastMessages.map((message,index) => (
                    <div key={index}>{message.text}</div>
                ))}
            </div>
        </>
    );
}
