import { Textarea, Button, Label } from "flowbite-react";
// import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { socket } from "./socket";
import { useParams } from "react-router";
import ChatBoard from "./ChatBoard";

export default function DirectMessage() {
    const textareaRef = useRef();
    console.count("rendered");
    const directMessages = useSelector(
        (state) => state.directMessages);
    const { userId } = useParams();

    useEffect(() => {
        socket.emit("get-all-direct-messages", userId);
    },[]);

    const sendMessage = () => {
        const text = textareaRef.current.value;
        socket.emit("new-direct-message", text);
        textareaRef.current.value = "";
        textareaRef.current.focus();
    };

    const onChange = (e) => {
        if (e.keyCode == 13 && !e.shiftKey) {
            sendMessage();
        }
    };

    return (
        <>
            <div className="flex w-6/12 flex-col space-y-2">
                <ChatBoard lastMessages={directMessages} />
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
            </div>
        </>
    );
}
