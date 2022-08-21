import { Avatar, Dropdown } from "flowbite-react";
import { useState, useEffect } from "react";
import Uploader from "./Uploader";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearNotification } from "./redux/notification/slice";
import Notification from "./Notification";
import { useDispatch } from "react-redux";

export default function DropdownMenu({ userProfile, setUserProfile }) {
    const match = useRouteMatch("/users/:id/dm");
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [notificationArrived, setNotificationArrived] = useState("");
    const notifications = useSelector((state) => state.notifications);
    const dispatch = useDispatch();

    const showUploader = () => {
        setIsUploaderOpen(isUploaderOpen === false ? true : false);
    };

    useEffect(() => {
        if (notifications.length > 0) {
            if (!match) {
                setNotificationArrived("busy");
            } else {
                if (
                    +match.params.id === notifications[0].sender_id ||
                    +match.params.id === notifications[0].receiver_id
                ) {
                    dispatch(clearNotification());
                } else {
                    setNotificationArrived("busy");
                }
            }
        } else {
            setNotificationArrived("");
        }
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
                <Notification
                    notifications={notifications}
                    id={userProfile.id}
                />
                <Dropdown.Item onClick={showUploader}>
                    Change Picture
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to="/deleteuser">Delete Account</Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
            </Dropdown>
        </div>
    );
}
