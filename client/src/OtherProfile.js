import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Card, Label,Avatar } from "flowbite-react";

export default function OtherProfile() {
    const { userId } = useParams();
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        fetch(`/users/${userId}.json`)
            .then((resp) => resp.json())
            .then((userData) => {
                console.log(userData);
                setUserProfile(userData); // need bio and photo
            });
    }, []);

    return (
        <>
            <div className="px-2 w-80">
                <Card>
                    <Avatar img={userProfile.profilepic} size="xl" />

                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {userProfile.first_name}
                        <br></br>
                        {userProfile.last_name}
                    </h5>
                    <div className="mb-2 block">
                        <Label htmlFor="bio" value="About" />
                    </div>
                    <p
                        id="bio"
                        className="font-normal text-gray-700 dark:text-gray-400"
                    >
                        {userProfile.bio}
                    </p>
                </Card>
            </div>
        </>
    );
}
