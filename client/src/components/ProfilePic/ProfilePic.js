import "../ProfilePic/ProfilePic.css";

export default function ProfilePic({ first, last, pic, showUploader }) {
    return (
        <>
            <img
                className="profilepic"
                width="100px"
                src={pic}
                alt={last && first}
                onClick={showUploader}
            />
        </>
    );
}
