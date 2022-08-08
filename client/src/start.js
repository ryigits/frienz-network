import { createRoot } from "react-dom/client";
import Welcome from "./components/Welcome/Welcome";
import App from "./App";

const main = document.querySelector("main");
const root = createRoot(main);

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            // this means that the user doens't have a userId and should see Welcome/Registration for now
            root.render(<Welcome />);
        } else {
            // this means the user is registered cause their browser DID have the right cookie and they should be seeing a logo
            root.render(<App userId={data.userId} />);
        }
    });
