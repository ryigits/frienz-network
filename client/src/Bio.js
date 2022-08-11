import { useEffect, useState } from "react";
import { Label, Alert, Button, Textarea } from "flowbite-react";

export default function Bio() {
    const [bioData, setBioData] = useState({});
    const [isEditSuccess, setIsEditSuccess] = useState(false);
    const [isEditButtonActive, setIsEditButtonActive] = useState(false);

    useEffect(() => {
        fetch("/profile")
            .then((data) => data.json())
            .then((userData) => {
                setBioData(userData.bio);
            });
    }, []);

    const updateBioData = () => {
        fetch("/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({bioData}),
        })
            .then((data) => data.json())
            .then(() => {
                setIsEditSuccess(true);
                setTimeout(() => {
                    setIsEditSuccess(false);
                }, 2000);
            });
    };
    const showEditButton = () => {
        setIsEditButtonActive(isEditButtonActive === false ? true : false);
    };

    return (
        <>
            <div id="textarea">
                <div className="mb-2 block">
                    <Label htmlFor="bio" value="About" />
                </div>
                <Textarea
                    id="bio"
                    value={bioData}
                    rows={5}
                    onFocus={showEditButton}
                    onBlur={showEditButton}
                    onChange={(e) =>
                        setBioData(e.target.value)
                    }
                />
                <div>
                    {isEditSuccess && (
                        <Alert color="info">
                            <span>
                                <span className="font-medium">
                                    Successfully Edited
                                </span>
                            </span>
                        </Alert>
                    )}
                </div>
                <div className="block ml-48">
                    {isEditButtonActive && (
                        <Button
                            onMouseDown={updateBioData}
                            size="xs"
                            color="purple"
                        >
                            Edit
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
