import "flowbite";
import Logo from "./components/Logo/Logo";
import Uploader from "./Uploader";
import { useState, useEffect } from "react";
import { Avatar, Card } from "flowbite-react";
import Bio from "./Bio";

export default function App() {
    const [userProfile, setUserProfile] = useState({});
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState("");

    useEffect(() => {
        fetch("/profile")
            .then((data) => data.json())
            .then((userData) => {
                setUserProfile(userData);
                setUserProfilePic(userData.url);
            });
    }, []);

    const showUploader = () => {
        setIsUploaderOpen(isUploaderOpen === false ? true : false);
    };

    return (
        <div className="w-full h-screen bg-orange-200">
            <nav>
                <div>
                    <div className="flex justify-between items-center h-52">
                        <div className="w-60 ml-4">
                            <Logo />
                        </div>
                        <div className="mr-14 object-center mt-10">
                            <div
                                className="flex flex-wrap gap-2"
                                onClick={showUploader}
                            >
                                <Avatar
                                    img={userProfilePic}
                                    rounded={true}
                                    size="lg"
                                />
                            </div>

                            <div className="ml-4">
                                {isUploaderOpen && (
                                    <Uploader
                                        showUploader={showUploader}
                                        setUserProfilePic={setUserProfilePic}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section className="bio px-2 w-80">
                <Card>
                    <div
                        className="flex flex-wrap gap-2"
                        onClick={showUploader}
                    >
                        <Avatar img={userProfilePic} size="xl" />
                    </div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <div className="whitespace-normal">
                            {userProfile.first}<br></br>
                            {userProfile.last}
                        </div>
                    </h5>
                    <div>
                        <Bio />
                    </div>
                </Card>
            </section>
        </div>
    );
}
