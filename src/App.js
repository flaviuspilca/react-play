import React, {createContext, useReducer} from "react";
import {Route, Switch, useHistory, useLocation, Redirect} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {faHome, faUser, faSpaceShuttle, faBookmark, faCalculator, faSignOutAlt, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import Navbar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/home";
import Profile from "./pages/Profile/profile";
import Mobility from "./pages/Mobility/mobility";
import Bookmarks from "./pages/Bookmarks/bookmarks";
import Tax from "./pages/Tax/tax";
import ProtectedRoute from "./auth/protected-route";
import "./App.scss";

export const HomeContext = createContext();

function reducer(state, item) {
    return [...state, item]
}

const App = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    const history = useHistory();
    const location = useLocation();
    const [favs, setFavs] = useReducer(reducer, []);


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
            pageName: "Bookmarks",
            icon: faBookmark,
            show: true
        },
        {
            pageName: "Tax",
            icon: faCalculator,
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
        <HomeContext.Provider value={{favs, setFavs}}>
            <div id="body-row" className="row no-gutters">
                <div className="col-sm-1">
                    <Sidebar location={location} history={history} config={navigationConfig}/>
                </div>
                <div className="col-sm-11">
                    <Navbar location={location} history={history} config={navigationConfig}/>
                    <main role="main" className="container-fluid flex-grow-1 overflow-auto">
                        <Switch>
                            <Route path="/"
                                   exact
                                   render={() => <Redirect to="/home"/>}/>
                            <Route path="/home" component={Home} />
                            <ProtectedRoute path="/profile" component={Profile} />
                            <Route path="/mobility" component={Mobility} />
                            <Route path="/bookmarks"
                                   render={() => <Bookmarks favs={favs}/>}
                            />
                            <Route path="/tax" component={Tax} />
                        </Switch>
                    </main>
                    <Footer />
                </div>
            </div>
        </HomeContext.Provider>
    );
};

export default App;
