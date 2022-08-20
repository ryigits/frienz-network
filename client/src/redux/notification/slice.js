export default function notificationReducer(notifications = [], action) {
    switch (action.type) {
                    case "new-friendship-request":
                        return [action.payload.userData, ...notifications];
                    case "clear-notification":
                        return (notifications = []);
                    default:
                        return notifications;
    }
}

export function receiveFriendRequest(userData) {
    return {
        type: "new-friendship-request",
        payload: { userData },
    };
}

export function clearNotification() {
    return {
        type: "clear-notification",
    };
}
