/*eslint no-unused-vars: "error"*/
import "flowbite";
import { useState, useEffect } from "react";
import { Flowbite } from "flowbite-react";
import Profile from "./Profile";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import FindPeople from "./FindPeople";
import OtherProfile from "./OtherProfile";
import Friends from "./Friends";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";

export default function App() {
    const [userProfile, setUserProfile] = useState({});
    useEffect(() => {
        fetch("/profile")
            .then((data) => data.json())
            .then((userData) => {
                setUserProfile(userData);
            });
    }, []);
    const theme = {
        theme: {},
    };
    return (
        <Flowbite theme={theme}>
            <BrowserRouter>
                <div className="w-screen h-screen bg-sky-50">
                    <div className="flex flex-row w-screen justify-between h-20 border-4 border-b-amber-300">
                        <div>
                            <Link to="/">
                                <img
                                    width="88px"
                                    className=""
                                    src="./frienz.png"
                                ></img>
                            </Link>
                        </div>
                        <div className="flex space-x-8 grow justify-center self-end mb-2">
                            <NavLink
                                to="/friends"
                                className={({ isActive }) =>
                                    isActive
                                        ? ""
                                        : "text-2xl font-medium text-gray-500"
                                }
                            >
                                Friends
                            </NavLink>
                            <NavLink
                                to="/users"
                                className={({ isActive }) =>
                                    isActive
                                        ? ""
                                        : "text-2xl font-medium text-gray-500"
                                }
                            >
                                Find People
                            </NavLink>
                            <NavLink
                                to="/chat"
                                className={({ isActive }) =>
                                    isActive
                                        ? ""
                                        : "text-2xl font-medium text-gray-500"
                                }
                            >
                                Chat
                            </NavLink>
                        </div>
                        <div className="flex mt-2 h-40 w-20 mr-10">
                            <DropdownMenu userProfile={userProfile} />
                        </div>
                    </div>
                    <section className="py-4 min-h-min">
                        <Route exact path="/">
                            <div className="ml-40 mt-2">
                                <Profile userProfile={userProfile} />
                            </div>
                        </Route>
                        <Route exact path="/users">
                            <FindPeople />
                        </Route>
                        <Route path="/users/:userId">
                            <OtherProfile id={userProfile.id} />
                        </Route>
                        <Route exact path="/friends">
                            <Friends />
                        </Route>
                    </section>
                </div>
            </BrowserRouter>
        </Flowbite>
    );
}
