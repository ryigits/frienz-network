import useStatefulFields from "./hooks/use-stateful-fields";
import { useState } from "react";
import { Alert } from "flowbite-react";

export default function DeleteUser({ userProfile }) {
    const [values, onFormInputChange] = useStatefulFields();
    const [error, setError] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        fetch("/deleteuser", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((resp) => resp.json())
            .then((data) => {
                data.success && location.replace("/");
                !data.success && setError(true);
            })
            .catch(() => {
                setError(true);
            });
    };

    return (
        <>
            <form className="space-y-4 md:space-y-6">
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Please type your email to delete your account!!!
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={userProfile.email}
                        required=""
                        onChange={onFormInputChange}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={onSubmit}
                >
                    Delete
                </button>
                <div>
                    {error && (
                        <Alert color="failure"> Something went wrong</Alert>
                    )}
                </div>
            </form>
        </>
    );
}
