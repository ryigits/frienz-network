import { Component } from "react";

export default class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            view: 1,
            email: "",
            code: "",
            error: "",
            succes: "",
            newPassword: "",
        };
        this.currentView = this.currentView.bind(this);
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
        console.log(this.state);
        fetch("/sendCodeBeforeResetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("mail sent", data);
                this.setState({ view: 2, email: data.email });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleCode() {
        console.log(this.state);
        fetch("/resetPasswordWithCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log("reset password has been done", data);
                this.setState({ view: 3, success: true });
            })
            .catch((err) => {
                // if something goes wrong => render an error
                console.log(err);
            });
    }

    redirectLogin() {
        setTimeout(function () {
            window.location.href = "/login";
        }, 3000);
    }

    currentView() {
        if (this.state.view === 1) {
            return (
                <>
                    {this.state.error && <p className="error">Error</p>}
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleSubmit()}>Submit</button>
                </>
            );
        } else if (this.state.view === 2) {
            return (
                <>
                    {this.state.error && <p className="error">Error</p>}
                    <input
                        type="text"
                        name="code"
                        placeholder="Please Enter Code"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Please Enter New Password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <button onClick={() => this.handleCode()}>Submit</button>
                </>
            );
        } else if (this.state.view === 3) {
            return (
                <>
                    {this.state.error && <p className="error">Error</p>}
                    <p>
                        Your Password has been successfully reset.Please wait 3
                        seconds.You are redirecting....
                    </p>
                    {this.redirectLogin()}
                </>
            );
        }
    }

    render() {
        return <>{this.currentView()}</>;
    }
}
