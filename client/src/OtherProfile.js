import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Card, Label } from "flowbite-react";
import CloseFriend from "./CloseFriend";

export default function OtherProfile() {
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
                    <CloseFriend userId={userId} />
                </Card>
            </div>
        </>
    );
}
