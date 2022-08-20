import { Textarea, Button, Label,Alert } from "flowbite-react";

import ChatBoard from "./ChatBoard";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { socket } from "./socket";

export default function Chat() {
    const textareaRef = useRef();
    // console.count("rendered");
    const lastMessages = useSelector((state) => state.messages);
    const [error, setError] = useState(false);

    const sendMessage = () => {
        const text = textareaRef.current.value;
        if (text.length > 24) {
            setError(true);
        } else {
            socket.emit("new-message", text);
            textareaRef.current.value = "";
            textareaRef.current.focus();
        }
    };

    const onChange = (e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            sendMessage();
        }
    };

    return (
        <>
            <div className="flex w-6/12 flex-col space-y-2">
                <ChatBoard lastMessages={lastMessages} />
                <div className="mb-2 block">
                    <Label htmlFor="textarea" value="Your message" />
                </div>
                <Textarea
                    id="textarea"
                    ref={textareaRef}
                    rows={3}
                    onKeyUp={onChange}
                />
                <div className="self-center">
                    <Button onClick={sendMessage}>Send</Button>
                </div>
                <div>{error && <Alert color="failure">Please Type Less</Alert>}</div>
            </div>
        </>
    );
}
