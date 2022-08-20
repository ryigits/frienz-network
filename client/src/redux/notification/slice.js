export default function notificationReducer(notifications = [], action) {
    switch (action.type) {
                    case "new-notification":
                        return [action.payload.notification, ...notifications];
                    case "clear-notification":
                        return (notifications = []);
                    default:
                        return notifications;
    }
}

export function receiveNotification(notification) {
    return {
        type: "new-notification",
        payload: { notification },
    };
}

export function clearNotification() {
    return {
        type: "clear-notification",
    };
}
