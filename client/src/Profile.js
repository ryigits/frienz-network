import { Avatar, Card } from "flowbite-react";
import Bio from "./Bio";

export default function Profile({showUploader,userProfilePic,userProfile}) {
    return (
        <>
            <section className="bio px-2 w-80 ">
                <Card>
                    <div
                        className="flex flex-wrap gap-2"
                        onClick={showUploader}
                    >
                        <Avatar img={userProfilePic} size="xl" />
                    </div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <div className="whitespace-normal">
                            {userProfile.first}
                            <br></br>
                            {userProfile.last}
                        </div>
                    </h5>
                    <div>
                        <Bio  />
                    </div>
                </Card>
            </section>
        </>
    );
}
