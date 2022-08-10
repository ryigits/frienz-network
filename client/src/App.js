/*eslint no-unused-vars: "error"*/
import "flowbite";
import Uploader from "./Uploader";
import { useState, useEffect } from "react";
import { Avatar, Navbar, Dropdown, Flowbite } from "flowbite-react";
import Profile from "./Profile";
import { BrowserRouter, Route, Link, NavLink } from "react-router-dom";
import FindPeople from "./FindPeople";

export default function App() {
    const [userProfile, setUserProfile] = useState({});
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState("");

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

    useEffect(() => {
        fetch("/profile")
            .then((data) => data.json())
            .then((userData) => {
                setUserProfile(userData);
                setUserProfilePic(userData.url);
            });
    }, []);

    const showUploader = () => {
        setIsUploaderOpen(isUploaderOpen === false ? true : false);
    };

    const theme = {
        theme: {
            navbar: {
                base: "bg-orange-200 px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
                link: {
                    base: "block text-lg py-2 pr-4 pl-3 md:p-0",
                    active: {
                        on: "bg-purple-700 text-white dark:text-white md:bg-transparent md:text-purple-700",
                        off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
                    },
                    disabled: {
                        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
                        off: "",
                    },
                },
            },
        },
    };
    return (
        <Flowbite theme={theme}>
            <BrowserRouter>
                <div className="w-full h-screen bg-orange-200">
                    <div className="">
                        <Navbar>
                            <Navbar.Brand>
                                <Link to="/">
                                    <img
                                        src="./frienz.png"
                                        className="mr-3 h-20 sm:h-9"
                                        alt="Logo"
                                    />
                                </Link>
                                <span className="self-center whitespace-nowrap text-3xl text-white font-semibold dark:text-white">
                                    Frienz
                                </span>
                            </Navbar.Brand>
                            <div className="flex md:order-2">
                                {/* <DarkThemeToggle /> */}
                                <Dropdown
                                    arrowIcon={true}
                                    inline={true}
                                    label={
                                        <Avatar
                                            alt="User settings"
                                            img={userProfilePic}
                                            rounded={true}
                                        />
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm font-medium">
                                            {userProfile.first}
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                            {userProfile.last}
                                        </span>
                                    </Dropdown.Header>
                                    <Dropdown.Item>
                                        <div onMouseDown={showUploader}>
                                            Change Picture
                                        </div>
                                        {isUploaderOpen && (
                                            <Uploader
                                                showUploader={showUploader}
                                                setUserProfilePic={
                                                    setUserProfilePic
                                                }
                                            />
                                        )}
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
                                </Dropdown>
                                <Navbar.Toggle />
                            </div>
                            <Navbar.Collapse>
                                <Navbar.Link>
                                    <NavLink
                                        as={Link}
                                        to="/users"
                                        className={({ isActive }) =>
                                            isActive ? "" : "text-xl"
                                        }
                                    >
                                        Find People
                                    </NavLink>
                                </Navbar.Link>
                                <Navbar.Link>
                                    <NavLink
                                        as={Link}
                                        to="/user"
                                        className={({ isActive }) =>
                                            isActive ? "" : "text-xl"
                                        }
                                    >
                                        Another Link
                                    </NavLink>
                                </Navbar.Link>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                    <section>
                        <Route exact path="/">
                            <div className="mt-2">
                                <Profile
                                    userProfile={userProfile}
                                    userProfilePic={userProfilePic}
                                    showUploader={showUploader}
                                />
                            </div>
                        </Route>
                        <Route path="/users">
                            <FindPeople />
                        </Route>
                    </section>
                    <footer>
                     
                    </footer>
                </div>
            </BrowserRouter>
        </Flowbite>
    );
}
