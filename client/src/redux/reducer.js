import { combineReducers } from "redux";
import closeFriendsAndWannabesReducer from "./closeFriends/slice";

const rootReducer = combineReducers({
    closeFriends: closeFriendsAndWannabesReducer,
});

export default rootReducer;
