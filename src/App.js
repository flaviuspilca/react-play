import React from "react";
import {Route, Switch} from "react-router-dom";
import {useHistory, useLocation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";

import Navbar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import Sidebar from "./components/Sidebar/Sidebar";


import Home from "./pages/home";
import Profile from "./pages/profile";
import ExternalApi from "./pages/external-api";
import Error from "./pages/error";

import ProtectedRoute from "./auth/protected-route";

import "./App.scss";

const App = () => {
    const { isLoading } = useAuth0();
    const history = useHistory();
    const location = useLocation();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id="wrapper">
            <div id="body-row" className="row no-gutters">
                <div className="col-sm-1">
                    <Sidebar location={location} history={history} />
                </div>
                <div className="col-sm-11">
                    <Navbar location={location} history={history} />
                    <main role="main" className="container-fluid flex-grow-1 overflow-auto">
                        <Switch>
                            <Route path={["/", "/home"]} exact component={Home} />
                            <ProtectedRoute path="/profile" component={Profile} />
                            <ProtectedRoute path="/external-api" component={ExternalApi} />
                            <Route path="/error" exact component={Error} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
