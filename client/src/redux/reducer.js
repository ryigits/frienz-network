import { combineReducers } from "redux";
import closeFriendsAndWannabesReducer from "./closeFriends/slice";
import messagesReducer from "./messages/slice";
import onlineUsersReducer from "./onlineUsers/slice";
import directMessagesReducer from "./directMessages/slice";

const rootReducer = combineReducers({
    closeFriends: closeFriendsAndWannabesReducer,
    messages: messagesReducer,
    onlineUsers: onlineUsersReducer,
    directMessages: directMessagesReducer,
});

export default rootReducer;
