import React from "react";
import {NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import {useAuth0} from "@auth0/auth0-react";
import LogStateButton from "../LogStateButton/log-state-button";
import './sidebar.scss';


const Sidebar = () => {
    const { isAuthenticated } = useAuth0();

    return(
        <div className="sidebar-container d-none d-md-block sidebar-expanded">
            <ul className="list-group">
                <li className="list-group-item-custom">
                    <NavLink
                        to="/"
                        exact
                        className="nav-link"
                        activeClassName="router-link-exact-active"
                    ><FontAwesomeIcon icon={faHome} /> <span>Home</span></NavLink>
                </li>

                { isAuthenticated && <li className="list-group-item-custom">
                    <NavLink
                        to="/external-api"
                        exact
                        className="nav-link"
                        activeClassName="router-link-exact-active"
                    ><FontAwesomeIcon icon={faSpaceShuttle} /> <span>External API</span></NavLink>
                </li>}

                { isAuthenticated && <li className="list-group-item-custom">
                    <NavLink
                        to="/profile"
                        exact
                        className="nav-link"
                        activeClassName="router-link-exact-active"
                    ><FontAwesomeIcon icon={faUser} /> <span>Profile</span></NavLink>
                </li>}

                <li className="list-group-item-custom">
                    <LogStateButton/>
                </li>

            </ul>
        </div>);
}

export default Sidebar;