import React from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {faHome, faUser, faSpaceShuttle, faCalendar, faSignOutAlt, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import Sidebar from "./components/Sidebar/Sidebar";
import Agenda from "./pages/Agenda/agenda";
import Home from "./pages/Home/home";
import Profile from "./pages/Profile/profile";
import Mobility from "./pages/Mobility/mobility";
import ProtectedRoute from "./auth/protected-route";
import "./App.scss";

const App = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    const history = useHistory();
    const location = useLocation();

    const navigationConfig = [
        {
            pageName: "Home",
            icon: faHome,
            show: true
        },
        {
            pageName: "Mobility",
            icon: faSpaceShuttle,
            show: true
        },
        {
            pageName: "Profile",
            icon: faUser,
            show: isAuthenticated
        },
        {
            pageName: "Agenda",
            icon: faCalendar,
            show: true
        },
        {
            pageName: "Log-in-out",
            icon: isAuthenticated ? faSignOutAlt : faSignInAlt,
            show: true
        }
    ];
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id="body-row" className="row no-gutters">
            <div className="col-sm-1">
                <Sidebar location={location} history={history} config={navigationConfig}/>
            </div>
            <div className="col-sm-11">
                <Navbar location={location} history={history} />
                <main role="main" className="container-fluid flex-grow-1 overflow-auto">
                    <Switch>
                        <Route path={["/", "/home"]} exact component={Home} />
                        <ProtectedRoute path="/profile" component={Profile} />
                        <Route path="/mobility" component={Mobility} />
                        <Route path="/agenda" component={Agenda} />
                    </Switch>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
