export default function onlineUsersReducer(onlineUsers = [], action) {
    switch (action.type) {
                    case "online-users":
                        return action.payload;
                    default:
                        return onlineUsers;
    }
}

export function receiveOnlineUsers(onlineUsers) {
    return {
        type: "online-users",
        payload:  onlineUsers ,
    };
}
