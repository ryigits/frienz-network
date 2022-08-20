import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Card, Label, Button } from "flowbite-react";
import CloseFriend from "./CloseFriend";
import { Link } from "react-router-dom";
import OtherProfileFriends from "./OtherProfileFriends";
import { Redirect } from "react-router-dom";

export default function OtherProfile({ id }) {
    const { userId } = useParams();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        fetch(`/users/${userId}.json`)
            .then((resp) => resp.json())
            .then((userData) => {
                setUserProfile(userData);
            });
    }, []);

    return (
        <>
            <div className="flex-row">
                {id == Number(userId) ? (
                    <Redirect to="/" />
                ) : (
                    <div className="px-2">
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
                                className="font-normal h-24 text-gray-700 dark:text-gray-400"
                            >
                                {userProfile.bio
                                    ? userProfile.bio
                                    : "No bio added"}
                            </p>
                            <CloseFriend userId={userId} />
                            <Link to={`/users/${userId}/dm`}>
                                <Button color="info">Direct Message</Button>
                            </Link>
                        </Card>

                        <OtherProfileFriends userId={userId} />
                    </div>
                )}
            </div>
        </>
    );
}
