export default function directMessagesReducer(directMessages = [], action) {
    switch (action.type) {
                    case "direct-messages-received":
                        if (action.payload.messages.length > 1) {
                            return action.payload.messages;
                        } else {
                            return [
                                action.payload.messages,
                                ...directMessages,
                            ];
                        }
                    case "clear-messages":
                        return (directMessages = []);
                    default:
                        return directMessages;
    }
}

export function receiveDirectMessages(messages) {
    return {
        type: "direct-messages-received",
        payload:  {messages} ,
    };
}

export function clearDirectMessages() {
    return {
        type: "clear-messages",
    };
}
