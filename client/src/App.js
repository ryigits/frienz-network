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
import Chat from "./Chat";
import OnlineUsers from "./OnlineUsers";
import DirectMessage from "./DirectMessage";
import DeleteUser from "./DeleteUser";


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
                        <div className="mt-px">
                            <Link to="/">
                                <img
                                    width="200px"
                                    className="mt-1"
                                    src="https://frienznetwork.s3.amazonaws.com/R6Mhxdxv17EXFgHv.gif"
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
                            <DropdownMenu
                                setUserProfile={setUserProfile}
                                userProfile={userProfile}
                            />
                        </div>
                    </div>
                    <section className="absolute w-40 h-3/4 px-2 py-2">
                        <h2 className="text-xl text-blue-500">Online FRIENZ</h2>
                        <OnlineUsers />
                    </section>
                    <section className="flex py-4 w-full justify-center min-h-min">
                        <Route exact path="/">
                            <div className="">
                                <Profile userProfile={userProfile} />
                            </div>
                        </Route>
                        <Route exact path="/users">
                            <FindPeople />
                        </Route>
                        <Route exact path="/users/:userId">
                            <OtherProfile id={userProfile.id} />
                        </Route>
                        <Route path="/users/:userId/dm">
                            <DirectMessage />
                        </Route>
                        <Route exact path="/friends">
                            <Friends />
                        </Route>
                        <Route exact path="/chat">
                            <Chat />
                        </Route>
                        <Route path="/deleteuser/">
                            <DeleteUser userProfile={userProfile} />
                        </Route>
                    </section>
                </div>
            </BrowserRouter>
        </Flowbite>
    );
}
