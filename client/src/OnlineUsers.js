import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function OnlineUsers() {
    const onlineUsers = useSelector((state) => state.onlineUsers);
    return (
        <>
            {onlineUsers?.map((onlineUser) => (
                <div key={onlineUser.id} className="flex flex-row items-center p-0.5">
                    <Link to={`/users/${onlineUser.id}`}>
                        <img width="35px" src={onlineUser.profilepic}></img>
                    </Link>
                    <div className="text-green-500 text-md">
                        {onlineUser.first_name}
                    </div>
                    {/* <div className="text-xs">
                                    {message.created_at}
                                </div> */}
                </div>
            ))}
        </>
    );
}
