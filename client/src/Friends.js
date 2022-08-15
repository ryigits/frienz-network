import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import {
    receiveFriendsAndWannabes,
    acceptCloseFriend,
    unFriendCloseFriend,
} from "./redux/closeFriends/slice";

export default function Friends() {
    const dispatch = useDispatch();

    const closeFriends = useSelector(
        (state) =>
            state.closeFriends &&
            state.closeFriends.filter((friend) => friend.arefriend)
    );
    

    const wannabes = useSelector(
        (state) =>
            state.closeFriends &&
            state.closeFriends.filter((friend) => !friend.arefriend)
    );


    useEffect(() => {
        // if(!closeFriends){
        //     (async ()=>{
        //         const res = await fetch("/closefriends/getall");
        //         const data = await res.json();
        //         dispatch(receiveFriendsAndWannabes(data));
        //     })();
        // }
        fetch("/closefriends/getall")
            .then((data) => data.json())
            .then((allFriend) => {
                dispatch(receiveFriendsAndWannabes(allFriend));
            });
    }, []);

    const handleWannabe = (id) => {
        fetch("/acceptCloseFriend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
        })
            .then((resp) => resp.json())
            .then(() => {
                dispatch(acceptCloseFriend(id));
            });
    };

    const removeFriend = (id) => {
        fetch("/removeCloseFriend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
        })
            .then((resp) => resp.json())
            .then(() => {
                dispatch(unFriendCloseFriend(id));
            });
    };

    return (
        <>
            <div className="flex justify-around">
                <div className="frienz">
                    <h2 className="text-xl font-semibold text-rose-500">
                        Your Frienz
                    </h2>
                    <div className="flex flex-row flex-wrap space-x-10">
                        {closeFriends &&
                            closeFriends.map((friend) => {
                                return (
                                    <div key={friend.id}>
                                        <Link to={`/users/${friend.id}`}>
                                            <Card imgSrc={friend.profilepic}>
                                                {friend.first_name}
                                                <br></br>
                                                {friend.last_name}
                                            </Card>
                                        </Link>
                                        <div>
                                            <Button
                                                onClick={() =>
                                                    removeFriend(friend.id)
                                                }
                                                color="failure"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="wannabes">
                    <h2 className="text-xl font-semibold text-purple-700">
                        Your Wannabes
                    </h2>
                    <div className="flex flex-row flex-wrap space-x-10">
                        {wannabes &&
                            wannabes.map((friend) => {
                                return (
                                    <div key={friend.id}>
                                        <Link to={`/users/${friend.id}`}>
                                            <Card imgSrc={friend.profilepic}>
                                                {friend.first_name}
                                                <br></br>
                                                {friend.last_name}
                                            </Card>
                                        </Link>
                                        <Button
                                            onClick={() =>
                                                handleWannabe(friend.id)
                                            }
                                            color="warning"
                                        >
                                            Accept
                                        </Button>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
