import { io } from "socket.io-client";
import { Textarea, Button, Label } from "flowbite-react";
// import { HiArrowNarrowRight } from "react-icons/hi";
import ChatBoard from "./ChatBoard";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveMessages } from "./redux/messages/slice";
import useStatefulFields from "./hooks/use-stateful-fields";

export default function Chat() {
    const dispatch = useDispatch();
    const socket = io.connect();
    const [values, onFormInputChange] = useStatefulFields();

    useEffect(() => {
        socket.on("last-10-messages", (data) => {
            dispatch(receiveMessages(data));
        });
    }, []);

    console.count("rendered");
    const lastMessages = useSelector((state) => state.messages);

    const handleClick = () => {
        socket.emit("new-message", { id: 100, text: values.textarea });
        dispatch(receiveMessages([{ id: 100, text: values.textarea }]));
    };

    return (
        <>
            <div className="flex w-80 flex-col space-y-2">
                <ChatBoard lastMessages={lastMessages} />
                <div className="mb-2 block">
                    <Label htmlFor="textarea" value="Your message" />
                </div>
                <Textarea
                    id="textarea"
                    name="textarea"
                    rows={3}
                    onChange={onFormInputChange}
                />
                <div className="self-center">
                    <Button onClick={handleClick}>Send</Button>
                </div>
            </div>
        </>
    );
}
