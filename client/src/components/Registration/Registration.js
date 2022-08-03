import { Component } from "react";
import "../Registration/Registration.css";

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }


    render() {
        return (
            <>
                <form id="registration-fields">
                    <input
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                    />
                    <input name="email" placeholder="E-Mail" type="email" />
                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                    />

                    <button>
                        Register
                    </button>
                </form>

                <div>
                    Already Member ?<a href="#">Login</a>
                </div>
            </>
        );
    }
}

export default Registration;
