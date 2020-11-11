import {NavLink} from "react-router-dom";
import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const NavButtons = () => {
    const { isAuthenticated } = useAuth0();

    return(
        <div className="navbar-nav mr-auto">
            { isAuthenticated &&
            <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="router-link-exact-active"
            >Home</NavLink>}

            { isAuthenticated &&
            <NavLink
                to="/profile"
                exact
                className="nav-link"
                activeClassName="router-link-exact-active"
            >Profile</NavLink>}

            { isAuthenticated &&
                <NavLink
                to="/external-api"
                exact
                className="nav-link"
                activeClassName="router-link-exact-active"
            >External API</NavLink>}

            <NavLink
                to="/external-api"
                exact
                className="nav-link"
                activeClassName="router-link-exact-active"
            >Optional button 1</NavLink>

            <NavLink
                to="/external-api"
                exact
                className="nav-link"
                activeClassName="router-link-exact-active"
            >Optional button 2</NavLink>
        </div>
    );
}

export default NavButtons;
