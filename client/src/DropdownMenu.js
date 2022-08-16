import { Avatar, Dropdown } from "flowbite-react";
import { useState } from "react";
import Uploader from "./Uploader";
import { Link } from "react-router-dom";

export default function DropdownMenu({ userProfile,setUserProfile }) {
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const showUploader = () => {
        setIsUploaderOpen(isUploaderOpen === false ? true : false);
    };

    const onLogout = (e) => {
        e.preventDefault();
        fetch("/logout", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then(() => {
                location.replace("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="mt-2">
            {isUploaderOpen && <Uploader setUserProfile={setUserProfile}userProfile={userProfile} showUploader={showUploader} />}
            <Dropdown
                label={
                    <Avatar
                        alt="url needed"
                        img={userProfile.url}
                        rounded={true}
                        size="md"
                    />
                }
                placement="left-start"
                arrowIcon={true}
                inline={true}
            >
                <Dropdown.Header>
                    <Link to="/">
                        <span className="block text-sm">
                            {userProfile.first}
                            {userProfile.last}
                        </span>
                        <span className="block truncate text-sm font-medium">
                            {userProfile.email}
                        </span>
                    </Link>
                </Dropdown.Header>
                <Dropdown.Item onClick={showUploader}>
                    Change Picture
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
    );
}
