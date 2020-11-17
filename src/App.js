import React from "react";
import {Route, Switch} from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Loading from "./components/Loading/loading";
import Sidebar from "./components/Sidebar/sidebar";


import Home from "./pages/home";
import Profile from "./pages/profile";
import ExternalApi from "./pages/external-api";

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
            <div className="row" id="body-row">
                <div className="col-1">
                    <Sidebar location={location} history={history}/>
                </div>

                <div className="col-11 d-flex flex-column">

                    <Navbar />
                    <div className="container flex-grow-1">
                        <Switch>
                            <Route path={["/", "/home"]} exact component={Home} />
                            <ProtectedRoute path="/profile" component={Profile} />
                            <ProtectedRoute path="/external-api" component={ExternalApi} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
