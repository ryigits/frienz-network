import { Avatar, Dropdown } from "flowbite-react";
import { useState, useEffect } from "react";
import Uploader from "./Uploader";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "./redux/notification/slice";

export default function DropdownMenu({ userProfile, setUserProfile }) {
    const dispatch = useDispatch();
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [notificationArrived, setNotificationArrived] = useState("");
    const notifications = useSelector((state) => state.notifications);

    const showUploader = () => {
        setIsUploaderOpen(isUploaderOpen === false ? true : false);
    };

    useEffect(() => {
        notifications.length > 0
            ? setNotificationArrived("busy")
            : setNotificationArrived("");
    }, [notifications]);

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

    const onClick = () => {
        dispatch(clearNotification());
    };

    return (
        <div className="mt-2">
            {isUploaderOpen && (
                <Uploader
                    setUserProfile={setUserProfile}
                    userProfile={userProfile}
                    showUploader={showUploader}
                />
            )}
            <Dropdown
                label={
                    <Avatar
                        alt="url needed"
                        img={userProfile.url}
                        rounded={true}
                        size="md"
                        status={notificationArrived}
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
                {notifications?.map((notification, index) => (
                    <Dropdown.Item  key={index}>
                        <div className="text-rose-500">
                            <Link
                                onClick={onClick}
                                to={`/users/${notification.id}`}
                            >
                                New friendship request from{" "}
                                {notification.first_name}
                            </Link>
                        </div>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item onClick={showUploader}>
                    Change Picture
                </Dropdown.Item>
                <Dropdown.Item >
                    <Link to="/deleteuser">Delete Account</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item  onClick={onLogout}>
                    Sign out
                </Dropdown.Item>
            </Dropdown>
            
        </div>
    );
}
