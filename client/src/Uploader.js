import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";

export default function Uploader({ showUploader,userProfile, setUserProfile }) {
    const [show, setShow] = useState(false);


    useEffect(() => {
        setShow(true);
    }, []);

    const onClose = () => {
        setShow(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fileInput = form.querySelector("input[type=file]");
        if (fileInput.files.length < 1) return alert("you must add a file");
        const formData = new FormData(form);
        fetch("/image", {
            method: "POST",
            body: formData,
        })
            .then((result) => result.json())
            .then((data) => {
                setUserProfile({...userProfile,url:data.url});
                showUploader();
                setShow(false);
            });
    };

    return (
        <React.Fragment>
            <Modal show={show} size="md" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            <form
                                encType="multipart/form-data"
                                onSubmit={handleSubmit}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="photo"
                                    className="file:ml-10 file:py-2 file:px-4"
                                />
                                <input
                                    className="inline-flex items-center rounded-lg bg-blue-700 py-4 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-10 hover:cursor-pointer"
                                    type="submit"
                                    name="button"
                                    value="Upload"
                                />
                            </form>
                        </h3>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
