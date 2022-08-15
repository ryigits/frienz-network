import { createRoot } from "react-dom/client";
import Welcome from "./Welcome";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducer.js";
import { Provider } from "react-redux";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

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
            root.render(
                <Provider store={store}>
                    <App  />
                </Provider>
            );
        }
    });
