import useStatefulFields from "./hooks/use-stateful-fields";
import useAuthSubmit from "./hooks/use-auth-submit";
import { Alert } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Login() {
    const [values, onFormInputChange] = useStatefulFields();
    const [error, onFormSubmit] = useAuthSubmit("/login", values);

    return (
        <>
            <section className="bg-orange-200 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img
                            className="w-8 h-8 mr-2"
                            src="./frienz.png"
                            alt="logo"
                        />
                        Frienz
                    </a>
                    <div className="w-full bg-slate-100 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Dive in
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
                                        onChange={onFormInputChange}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        onChange={onFormInputChange}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <a className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Forgot password?
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    onClick={onFormSubmit}
                                >
                                    Sign in
                                </button>
                                <div>
                                    {error && (
                                        <Alert color="failure"> {error}</Alert>
                                    )}
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have a Frienz yet?{" "}
                                    <Link
                                        className="font-medium text-primary-600 dark:text-primary-500"
                                        to="/"
                                    >
                                        Register Here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
