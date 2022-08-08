import React from "react";
import { Button, Modal, } from "flowbite-react";

export default function Uploader() {
    const onClick = () => {};

    const onClose = () => {};

    return (
        <React.Fragment>
            <Button onClick={onClick}>Toggle modal</Button>
            <Modal show={false} size="md" popup={true} onClose={onClose}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={onClick}>
                                Yes, Im sure
                            </Button>
                            <Button color="gray" onClick={onClick}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}
