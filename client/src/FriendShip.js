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
                } else if (friendship.sender_id === Number(userId)) {
                    //sender ile bakilan sayfa ayni ise approve cikarman lazim
                    if (friendship.arefriend) {
                        setFriendShipStatus(friendship);
                    } else {
                        setFriendShipStatus({ ...friendship, approve: true });
                    }
                } else if (friendship.receiver_id === Number(userId)) {
                    //cancel request cikmali
                    setFriendShipStatus(friendship);
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
                    setFriendShipStatus({ pending: false });
                }
            });
    };

    const acceptFriend = () => {
        fetch(`/friendship/accept.json`, {
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
                    console.log("friendship accepted");
                    setFriendShipStatus({ approve: true });
                }
            });
    };

    const removeFriend = () => {
        fetch(`/friendship/remove.json`, {
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
                    console.log("friendship removed");
                    setFriendShipStatus({ pending: true });
                }
            });
    };

    return (
        <>
            {friendShipStatus.arefriend ? (
                <Button onClick={removeFriend} color="failure">Remove Friend</Button>
            ) : !friendShipStatus.pending ? (
                friendShipStatus.approve ? (
                    <Button onClick={acceptFriend} color="success">Accept Request</Button>
                ) : (
                    <Button onClick={removeFriend} color="warning">Cancel Request</Button>
                )
            ) : (
                <Button onClick={addFriend}>Add Friend</Button>
            )}
        </>
    );
}
