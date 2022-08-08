import { Avatar } from "flowbite-react";

export default function ProfilePic({ userProfilePic, showUploader }) {
    return (
        <>
            <div className="flex flex-wrap gap-2" onClick={showUploader}>
                
                <Avatar img={userProfilePic} rounded={true} size="lg" />
            </div>
        </>
    );
}
