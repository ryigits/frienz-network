import { useState, useEffect } from "react";
import { Card, TextInput, Alert } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState("");
    const [showRecent, setShowRecent] = useState(true);

    useEffect(() => {
        fetch("/recentusers")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    }, []);

    const handleSearchField = (e) => {
        setUsers([]);
        setShowRecent(false);
        setSearchUser(e.target.value);
    };

    useEffect(() => {
        let abort;
        (async () => {
            const data = await fetch(`/user/${searchUser}.json`).then(
                (response) => response.json()
            );
            if (!abort) {
                setUsers(data);
            }
        })();
        return () => {
            abort = true;
        };
    }, [searchUser]);

    return (
        <>
            <div className="flex flex-col justify-center items-center ">
                <div className="text-2xl text-green-700 font-semibold py-2 ">
                    {" "}
                    {showRecent ? <>Newcomerz</> : <>Search Result</>}
                </div>
                <div className="h-120 w-120 flex">
                    {users.length === 0 ? (
                        <div className="w-40">
                            <Alert color="failure">No Match</Alert>
                        </div>
                    ) : (
                        <div className="recentusers flex flex-row flex-wrap justify-around ">
                            {users.map((user, index) => (
                                <div key={index} className="w-40 m-2">
                                    <Link to={`/users/${user.id}`}>
                                        <Card
                                            imgSrc={user.profilepic}
                                            data-testid={user.id}
                                        >
                                            {user.first_name}
                                            <br></br>
                                            {user.last_name}
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-4 w-44">
                    <div>
                        <TextInput
                            color="success"
                            className=""
                            onChange={handleSearchField}
                            placeholder="Search Someone"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
