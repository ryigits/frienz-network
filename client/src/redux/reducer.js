import { combineReducers } from "redux";
import closeFriendsAndWannabesReducer from "./closeFriends/slice";
import messagesReducer from "./messages/slice";
import onlineUsersReducer from "./onlineUsers/slice";

const rootReducer = combineReducers({
    closeFriends: closeFriendsAndWannabesReducer,
    messages: messagesReducer,
    onlineUsers: onlineUsersReducer,
});

export default rootReducer;
