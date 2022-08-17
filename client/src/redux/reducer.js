import { combineReducers } from "redux";
import closeFriendsAndWannabesReducer from "./closeFriends/slice";
import messagesReducer from "./messages/slice";

const rootReducer = combineReducers({
    closeFriends: closeFriendsAndWannabesReducer,
    messages: messagesReducer,
});

export default rootReducer;
