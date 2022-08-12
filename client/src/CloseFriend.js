import { Button } from "flowbite-react";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function CloseFriend() {
    const [button, setButton] = useState({});
    const { userId } = useParams();
    useEffect(() => {
        fetch(`/closefriend/${userId}.json`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                const currentButton = handleResponse(data);
                setButton(currentButton);
            });
    }, []);

    const handleResponse = (data) => {
        let button = {
            text: "Add to Close Friend",
            url: "/addCloseFriend",
            color: "dark",
        };
        if (data.arefriend) {
            button.text = "Remove from Close Friend";
            button.url = "/removeCloseFriend";
            button.color = "failure";
        } else if (data.sender_id === Number(userId)) {
            button.text = "Accept Request";
            button.url = "/acceptCloseFriend";
            button.color = "warning";
        } else if (data.receiver_id === Number(userId)) {
            button.text = "Cancel Request";
            button.url = "/removeCloseFriend";
            button.color = "warning";
        }
        return button;
    };

    const onClick = () => {
        fetch(`${button.url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: Number(userId) }),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("data after click", data);
                const currentButton = handleResponse(data);
                setButton(currentButton);
            });
    };

    return (
        <>
            <Button onClick={onClick} color={button.color}>
                {button.text}
            </Button>
        </>
    );
}