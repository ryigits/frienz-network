import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "flowbite-react";

export default function Uploader({ setUserProfilePic, showUploader }) {
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
                setUserProfilePic(data.url);
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
                                />
                                <input
                                    className="w-20 border-none text-cyan-700 text-xl hover:cursor-pointer mt-4"
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
