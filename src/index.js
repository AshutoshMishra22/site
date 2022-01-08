import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import serviceworker from "./serviceWorker";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
serviceworker();
