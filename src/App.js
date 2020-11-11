import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import NavBar from "./components/nav-bar";
import Footer from "./components/footer";
import Loading from "./components/loading";

import Home from "./pages/home";
import Profile from "./pages/profile";
import ExternalApi from "./pages/external-api";

import ProtectedRoute from "./auth/protected-route";

import "./App.css";

const App = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id="app" className="d-flex flex-column h-100">
            <NavBar />
            <div className="container flex-grow-1">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <ProtectedRoute path="/profile" component={Profile} />
                    <ProtectedRoute path="/external-api" component={ExternalApi} />
                </Switch>
            </div>
            <Footer />
        </div>
    );
};

export default App;
