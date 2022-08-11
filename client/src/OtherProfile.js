import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Card, Label, Button } from "flowbite-react";

export default function OtherProfile() {
    const { userId } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const [friendShipStatus, setFriendShipStatus] = useState({});

    useEffect(() => {
        fetch(`/users/${userId}.json`)
            .then((resp) => resp.json())
            .then((userData) => {
                setUserProfile(userData);
            });
    }, []);

    useEffect(() => {
        fetch(`/friendship/${userId}.json`)
            .then((resp) => resp.json())
            .then((friendship) => {
                setFriendShipStatus(friendship);
                console.log(friendship);
            });
    }, []);

    const makeFriendShipRequest = () => {
        fetch(`/friendship/${userId}.json`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ id: friendShipStatus.id }),
        })
            .then((data) => data.json())
            .then((data) => {
                if(data.success){
                    setFriendShipStatus({ ...friendShipStatus, pending: true });
                }
                
            });
    };

    return (
        <>
            <div className="px-2 ml-40 mt-2">
                <Card horizontal={true} imgSrc={userProfile.profilepic}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {userProfile.first_name}
                        <br></br>
                        {userProfile.last_name}
                    </h5>
                    <div className="block">
                        <Label htmlFor="bio" value="About" />
                    </div>
                    <p
                        id="bio"
                        className="font-normal text-gray-700 dark:text-gray-400"
                    >
                        {userProfile.bio ? userProfile.bio : "No bio added"}
                    </p>
                    {friendShipStatus.pending ? (
                        <Button>Cancel Request</Button>
                    ) : !friendShipStatus.arefriend ? (
                        <Button onClick={makeFriendShipRequest}>
                            Add Friend
                        </Button>
                    ) : (
                        <Button>Remove Friend</Button>
                    )}
                </Card>
            </div>
        </>
    );
}
