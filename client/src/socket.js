import { io } from "socket.io-client";
import { receiveMessages } from "./redux/messages/slice";
import { receiveOnlineUsers } from "./redux/onlineUsers/slice";
import { receiveDirectMessages } from "./redux/directMessages/slice";
import { receiveFriendRequest } from "./redux/notification/slice";
export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("messages", (data) => {
            store.dispatch(receiveMessages(data));
        });
        socket.on("online-users", (data) => {
            store.dispatch(receiveOnlineUsers(data));
        });
        socket.on("direct-messages", (data) => {
            store.dispatch(receiveDirectMessages(data));
        });
        socket.on("Accept Friend", (data) => {
            store.dispatch(receiveFriendRequest(data));
        });
    }
};
