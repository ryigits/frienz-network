import "flowbite";
import Logo from "./components/Logo/Logo";
import ProfilePic from "./components/ProfilePic/ProfilePic";
import Uploader from "./Uploader";
import { useState, useEffect } from "react";

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
        <>
            <nav>
                <div className="w-full h-screen bg-orange-200">
                    <div className="flex justify-around content-around">
                        <div className="w-40">
                            <Logo />
                        </div>
                        <div>
                            <ProfilePic
                                userProfilePic={userProfilePic}
                                showUploader={showUploader}
                            />
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
        </>
    );
}
