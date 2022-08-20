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
            // () => console.log("this.state: ", this.state)
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        
        fetch("/sendCodeBeforeResetPassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                this.setState({ view: 2, email: data.email });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleCode(e) {
        // console.log(this.state);
        e.preventDefault();
        fetch("/resetPasswordWithCode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then(() => {

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
                    <section className="bg-orange-200 dark:bg-gray-900">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <a className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                                <img
                                    className="h-24 border-2 m-4"
                                    src="https://frienznetwork.s3.amazonaws.com/R6Mhxdxv17EXFgHv.gif"
                                    alt="logo"
                                />
                            </a>
                            <div className="w-full bg-slate-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Recover Your Password
                                    </h1>
                                    <form className="space-y-4 md:space-y-6">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Your email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="name@whatever.com"
                                                required=""
                                                onChange={(e) =>
                                                    this.handleChange(e)
                                                }
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            onClick={(e) => this.handleSubmit(e)}
                                        >
                                            Recover
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <div className="w-screen min-h-screen bg-sky-50 flex flex-col items-center justify-center ">
                        <p className="font-bold">Please type your email</p>
                        <div className="m-4 block text-sm  text-gray-900 dark:text-white">
                            <input
                                type="email"
                                name="email"
                                placeholder="E-Mail"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div>
                            <button
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                onClick={() => this.handleSubmit()}
                            >
                                Submit
                            </button>
                        </div>
                    </div> */}
                </>
            );
        } else if (this.state.view === 2) {
            return (
                <>
                    {this.state.error && <p className="error">Error</p>}
                    <section className="bg-orange-200 dark:bg-gray-900">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <a className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                                <img
                                    className="h-24 border-2 m-4"
                                    src="https://frienznetwork.s3.amazonaws.com/R6Mhxdxv17EXFgHv.gif"
                                    alt="logo"
                                />
                            </a>
                            <div className="w-full bg-slate-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Recover Your Password
                                    </h1>
                                    <form className="space-y-4 md:space-y-6">
                                        <div>
                                            <input
                                                type="text"
                                                name="code"
                                                id="code"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Please Enter Code"
                                                onChange={(e) =>
                                                    this.handleChange(e)
                                                }
                                            />
                                            <label
                                                htmlFor="password"
                                                className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                id="password"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Type a new Password"
                                                onChange={(e) =>
                                                    this.handleChange(e)
                                                }
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            onClick={(e) => this.handleCode(e)}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* {this.state.error && <p className="error">Error</p>}

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
                    <button onClick={() => this.handleCode()}>Submit</button> */}
                </>
            );
        } else if (this.state.view === 3) {
            return (
                <>
                    {this.state.error && <p className="error">Error</p>}
                    <section className="bg-orange-200 min-h-screen flex flex-col items-center justify-center dark:bg-gray-900">
                        <p className="text-xl text-rose-500 font-medium">
                            Your Password has been successfully reset.Please
                            wait 3 seconds.You are redirecting....
                        </p>
                    </section>
                    {this.redirectLogin()}
                </>
            );
        }
    }

    render() {
        return <>{this.currentView()}</>;
    }
}
