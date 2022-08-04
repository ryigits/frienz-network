import Registration from "../Registration/Registration";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ResetPassword from "../ResetPassword/ResetPassword";
import Login from "../Login/Login";

export default function Welcome() {
    return (
        <div>
            <h1>Frienz</h1>

            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                        <Link to="/resetpassword">
                            Cant you remember Password??
                        </Link>
                        <Link to="/login">
                            Already Member ? Log in
                        </Link>
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/resetpassword">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
