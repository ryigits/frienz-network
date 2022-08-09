import "flowbite";
import Logo from "./components/Logo/Logo";
import Uploader from "./Uploader";
import { useState, useEffect } from "react";
import { Avatar, Navbar, Dropdown } from "flowbite-react";
import Profile from "./Profile";
import { BrowserRouter, Route, Link,NavLink } from "react-router-dom";
import FindPeople from "./FindPeople";

export default function App() {
    const [userProfile, setUserProfile] = useState({});
    const [isUploaderOpen, setIsUploaderOpen] = useState(false);
    const [userProfilePic, setUserProfilePic] = useState("");
    const [currentPage,setCurrentPage]=useState(true);

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

    return (
        <BrowserRouter>
            <div className="w-full h-screen bg-orange-100">
                <div className="">
                    <Navbar fluid={true} rounded={true}>
                        <Navbar.Brand>
                            <img
                                src="./frienz.png"
                                className="mr-3 h-20 sm:h-9"
                                alt="Logo"
                            />
                            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                                Frienz
                            </span>
                        </Navbar.Brand>
                        <div className="flex md:order-2">
                            <Dropdown
                                arrowIcon={false}
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
                                <Dropdown.Item>Sign out</Dropdown.Item>
                            </Dropdown>
                            <Navbar.Toggle />
                        </div>
                        <Navbar.Collapse>
                            <Navbar.Link>
                                {/* <Link to="/">Home</Link> */}
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive ? "text-xs" : "text-xl"
                                    }
                                >
                                    Home
                                </NavLink>
                            </Navbar.Link>
                            <Navbar.Link>
                                <NavLink
                                    to="/users"
                                    className={({ isActive }) =>
                                        isActive ? "text-xs" : "text-xl"
                                    }
                                >
                                    Find People
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
                <footer></footer>
            </div>
        </BrowserRouter>
    );
}
