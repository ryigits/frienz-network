import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";

export default function OtherProfileFriends({ userId }) {
    const [otherFriends, setOtherFriends] = useState([]);
    useEffect(() => {
        fetch(`/friends/${userId}.json`)
            .then((resp) => resp.json())
            .then((friends) => {
                setOtherFriends(friends);
            });
    }, []);
    return (
        <>
            <div className="recentusers flex flex-row flex-wrap justify-around ">
                {otherFriends.length > 0 && (
                    <div className="text-xl font-medium text-rose-600">
                        Frienz
                    </div>
                )}
                {otherFriends.map((user, index) => (
                    <div key={index} className="w-20 m-2">
                        <Link to={`/users/${user.id}`}>
                            <Card
                                horizontal={true}
                                imgSrc={user.profilepic}
                            >
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
