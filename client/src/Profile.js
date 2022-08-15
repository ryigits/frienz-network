import { Card } from "flowbite-react";
import Bio from "./Bio";


export default function Profile({ userProfile }) {

    return (
        <>
            <section className="bio px-2 min-w-fit">
                <Card
                    horizontal={true}
                    imgSrc={userProfile.url}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <div className="whitespace-normal">
                            {userProfile.first}
                            <br></br>
                            {userProfile.last}
                        </div>
                    </h5>
                    <div className="h-48 w-48">
                        <Bio />
                    </div>
                </Card>
            </section>
        </>
    );
}
