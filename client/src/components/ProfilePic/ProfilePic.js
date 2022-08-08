export default function ProfilePic({ userProfilePic,showUploader }) {
    return (
        <>
            <div className="w-40" onClick={showUploader}>
                <img alt={userProfilePic} src={userProfilePic} />
            </div>
        </>
    );
}
