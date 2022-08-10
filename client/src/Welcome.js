import { BrowserRouter, Route} from "react-router-dom";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Login from "./Login";
import Registration from "./Register";

export default function Welcome() {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Route exact path="/">
                        <Registration />
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
