import { useEffect, useState } from "react";

export default function Bio() {
    const [bioData, setBioData] = useState({});

    useEffect(() => {
        fetch("/bio")
            .then((data) => data.json())
            .then((bioData) => {
                console.log('%cBio.js line:10 bioData', 'color: #007acc;', bioData);
                setBioData(bioData);
            });
    }, []);

    return (
        <>
            <div>{bioData.age}</div>
            <div>{bioData.bio}</div>
        </>
    );
}
