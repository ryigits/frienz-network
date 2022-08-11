import { Button } from "flowbite-react";
import { useEffect, useState } from "react";

export default function FriendShip({ userId }) {
    const [friendShipStatus, setFriendShipStatus] = useState({});

    useEffect(() => {
        fetch(`/friendship/${userId}.json`)
            .then((resp) => resp.json())
            .then((friendship) => {
                console.log(friendship);
                if (friendship.result === "not found") {
                    setFriendShipStatus({ pending: true });
                }
                if (friendship.sender_id === Number(userId)) {
                    //sender ile bakilan sayfa ayni ise approve cikarman lazim
                    setFriendShipStatus({ ...friendship, approve: true });
                } else if (friendship.receiver_id === Number(userId)) {
                    //cancel request cikmali
                }
            });
    }, []);

    const addFriend = () => {
        fetch(`/friendship/add.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ receiver_id: userId }),
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.success) {
                    console.log("adding friend done");
                }
            });
    };
    const cancelFriendShipRequest = () => {
        fetch(`/friendship/cancel/${userId}.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ id: friendShipStatus.id }),
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.success) {
                    setFriendShipStatus({
                        ...friendShipStatus,
                        pending: false,
                    });
                }
            });
    };

    return (
        <>
            {!friendShipStatus.pending ? (
                friendShipStatus.approve ? (
                    <Button>Accept Request</Button>
                ) : (
                    <Button onClick={cancelFriendShipRequest}>
                        Cancel Request
                    </Button>
                )
            ) : !friendShipStatus.arefriend ? (
                <Button onClick={addFriend}>Add Friend</Button>
            ) : (
                <Button>Remove Friend</Button>
            )}
        </>
    );
}
