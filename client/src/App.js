import "flowbite";
import Logo from "./components/Logo/Logo";
import ProfilePic from "./components/ProfilePic/ProfilePic";
import Uploader from "./Uploader";
import { useState, useEffect } from "react";

export default function App() {
    const [userProfile, setUserProfile] = useState({});
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);

    useEffect(() => {
        fetch("/profile")
            .then((data) => data.json())
            .then((userData) => {
                setUserProfile(userData);
            });
    },[]);

    const showUploader = ()=>{
        setIsUploaderOpen(true);
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
                                userProfile={userProfile}
                                showUploader={showUploader}
                            />
                            {isUploaderOpen && <Uploader />}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
