import React from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import Navbar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/home";
import Profile from "./pages/Profile/profile";
import Mobility from "./pages/Mobility/mobility";
import ProtectedRoute from "./auth/protected-route";
import UserContext from "./components/Context/context";
import "./App.scss";

const App = () => {
    const { isLoading } = useAuth0();
    const history = useHistory();
    const location = useLocation();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <UserContext.Provider>
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
                        <Route path="/mobility" component={Mobility} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </div>
        </UserContext.Provider>
    );
};

export default App;
