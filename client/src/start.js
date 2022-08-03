import ReactDOM from "react-dom";
import Welcome from "./components/Welcome/Welcome";
import Registration from "./components/Registration/Registration";

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Registration />, document.querySelector("main"));
        }
    });
