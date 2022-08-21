import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { clearNotification } from "./redux/notification/slice";
import { useDispatch } from "react-redux";

export default function Notification({ notifications, id }) {
    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(clearNotification());
    };
    const handleNotification = (notification) => {
        if (notification.dm) {
            return {
                url: `/users/${notification.sender_id}/dm`,
                text: `New message from ${notification.first_name}`,
            };
        } else {
            return {
                url: `/users/${notification.id}`,
                text: `New friendship request from ${notification.first_name}`,
            };
        }
    };
    return (
        <>
            {notifications
                ?.filter((e) => e.sender_id != id)
                .map((notification, index) => (
                    <Dropdown.Item key={index}>
                        <div className="text-rose-500">
                            <Link
                                onClick={onClick}
                                to={handleNotification(notification).url}
                            >
                                {handleNotification(notification).text}
                            </Link>
                        </div>
                    </Dropdown.Item>
                ))}
        </>
    );
}
