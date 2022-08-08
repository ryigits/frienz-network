import { useEffect, useState } from "react";
import { Label, Alert, Button, Textarea } from "flowbite-react";

export default function Bio() {
    const [bioData, setBioData] = useState({});
    const [isEditSuccess, setIsEditSuccess] = useState(false);
    const [isEditButtonActive, setIsEditButtonActive] = useState(false);

    useEffect(() => {
        fetch("/bio")
            .then((data) => data.json())
            .then((bioData) => {
                setBioData(bioData);
            });
    }, []);

    const updateBioData = () => {
        fetch("/bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(bioData),
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
        console.log();
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
                    value={bioData.bio}
                    rows={3}
                    onFocus={showEditButton}
                    onBlur={showEditButton}
                    onChange={(e) =>
                        setBioData({ ...bioData, bio: e.target.value })
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
