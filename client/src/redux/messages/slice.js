export default function messageReducer(messages = [], action) {
    switch (action.type) {
                    case "messages-received":
                        if (action.payload.messages.length > 1) {
                            return action.payload.messages;
                        } else {
                            return [ action.payload.messages[0],...messages];
                        }
                    default:
                        return messages;
    }
}

export function receiveMessages(messages) {
    return {
        type: "messages-received",
        payload: { messages },
    };
}
