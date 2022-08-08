export default function ProfilePic({ userProfile,showUploader }) {
    return (
        <>
            <div className="w-40" onClick={showUploader}>
                <img alt={userProfile.first} src={userProfile.pic} />
            </div>
        </>
    );
}
