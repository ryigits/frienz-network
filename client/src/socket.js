import { io } from "socket.io-client";
import { receiveMessages } from "./redux/messages/slice";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("messages", (data) => {
            store.dispatch(receiveMessages(data));
        });
    }
};
