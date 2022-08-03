import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/Welcome";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            // this means that the user doens't have a userId and should see Welcome/Registration for now
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // this means the user is registered cause their browser DID have the right cookie and they should be seeing a logo
            ReactDOM.render(
                <img src="/spiced-logo.svg" alt="logo" />,
                document.querySelector("main")
            );
        }
    });
