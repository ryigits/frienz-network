import Registration from "../Registration/Registration";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ResetPassword from "../ResetPassword/ResetPassword";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>

            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
                        <Link to="/resetpassword">
                            Cant you remember Password??
                        </Link>
                    </Route>
                    <Route path="/login">{/* <Login/> */}</Route>
                    <Route path="/resetpassword">
                        <ResetPassword />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
