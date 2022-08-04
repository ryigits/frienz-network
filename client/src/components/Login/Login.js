import { Component } from "react";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }
    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }
    handleSubmit() {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("userLoggedin", data);
                this.redirectAfterLogin();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    redirectAfterLogin() {
        setTimeout(function () {
            window.location.href = "/";
        }, 200);
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <p className="error">oops! something went wrong!</p>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.handleSubmit()}>Login</button>
            </div>
        );
    }
}
