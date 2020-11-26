import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0Component from "./auth/auth0-component";
import "bootstrap/dist/css/bootstrap.min.css";


import "./index.css";

ReactDOM.render(
    <Router>
        <Auth0Component>
            <App />
        </Auth0Component>
    </Router>,
    document.getElementById("root")
);
