import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { Link,useRouteMatch } from "react-router-dom";
import {HiLogout} from "react-icons/hi";

export default function OtherProfileFriends({ userId }) {
    const match=useRouteMatch("/users/:id");
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
                    <div className="text-2xl font-medium text-rose-600">
                        Frienz <HiLogout />
                    </div>
                )}
                {otherFriends.length > 0 &&
                    otherFriends.map((user, index) => (
                        <div key={index} className="w-20 m-2">
                            {match.isExact ? (
                                <Link to={`/users/others/${user.id}`}>
                                    <Card
                                        horizontal={true}
                                        imgSrc={user.profilepic}
                                        data-testid={user.id}
                                    ></Card>
                                </Link>
                            ) : (
                                <Link to={`/users/${user.id}`}>
                                    <Card
                                        horizontal={true}
                                        imgSrc={user.profilepic}
                                        data-testid={user.id}
                                    ></Card>
                                </Link>
                            )}
                        </div>
                    ))}
            </div>
        </>
    );
}
