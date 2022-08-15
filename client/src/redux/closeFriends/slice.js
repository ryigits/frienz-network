export default function closeFriendsAndWannabesReducer(
    closefriends = [],
    action
) {
    if (action.type == "closefriends-and-wannabes/received") {
        closefriends = action.payload.allFriend;
    }

    if (action.type == "closefriends-and-wannabes/accept") {
        closefriends = closefriends.map((friend) => {
            if (friend.id == action.payload.id) {
                return { ...friend, arefriend: true };
            } else {
                return friend;
            }
        });
    }

    if (action.type == "closefriends-and-wannabes/unfriend") {
        closefriends = closefriends.filter(
            (friend) => friend.id != action.payload.id
        );
    }

    return closefriends;
}

export function receiveFriendsAndWannabes(allFriend) {
    return {
        type: "closefriends-and-wannabes/received",
        payload: { allFriend },
    };
}

export function acceptCloseFriend(id) {
    return {
        type: "closefriends-and-wannabes/accept",
        payload: { id },
    };
}

export function unFriendCloseFriend(id) {
    return {
        type: "closefriends-and-wannabes/unfriend",
        payload: { id },
    };
}
