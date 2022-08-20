import { Textarea, Button, Label } from "flowbite-react";
// import { HiArrowNarrowRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import { socket } from "./socket";
import { useParams } from "react-router";
import ChatBoard from "./ChatBoard";
import { clearDirectMessages } from "./redux/directMessages/slice";
import { useDispatch } from "react-redux";

export default function DirectMessage() {
    const dispatch = useDispatch();
    const textareaRef = useRef();
    const directMessages = useSelector((state) => state.directMessages);
    const { userId } = useParams();

    useEffect(() => {
        socket.emit("get-all-direct-messages", userId);
        return () => dispatch(clearDirectMessages());
    }, []);

    const sendMessage = () => {
        const text = textareaRef.current.value;
        const message = { text, receiverId: userId };
        socket.emit("new-direct-message", message);
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
                <ChatBoard
                    lastMessages={directMessages}
                />
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
