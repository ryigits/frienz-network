import { combineReducers } from "redux";
import closeFriendsAndWannabesReducer from "./closeFriends/slice";
import messagesReducer from "./messages/slice";
import onlineUsersReducer from "./onlineUsers/slice";
import directMessagesReducer from "./directMessages/slice";
import notificationReducer from "./notification/slice";

const rootReducer = combineReducers({
    closeFriends: closeFriendsAndWannabesReducer,
    messages: messagesReducer,
    onlineUsers: onlineUsersReducer,
    directMessages: directMessagesReducer,
    notifications: notificationReducer,
});

export default rootReducer;
