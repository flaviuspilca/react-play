import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import SideNav, {NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faUser, faSpaceShuttle, faSignOutAlt, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import {useAuth0} from "@auth0/auth0-react";
import ClickOutside from "react-click-outside";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Sidebar.scss";


const Sidebar = (props) => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const history = useHistory();
    const [expanded, setExpanded] = useState(false);

    return(
        <div className="sidebar-container">
            <ClickOutside
                onClickOutside={() => {
                    setExpanded(false);
                }}
            >
                <SideNav
                    expanded={expanded}
                    onToggle={(expanded) => {
                        setExpanded(expanded);
                    }}
                    onSelect={(selected) => {
                        if( selected !== 'log-in-out') {
                            const navigateTo = '/' + selected;
                            if (props.location.pathname !== navigateTo) {
                                history.push(navigateTo);
                            }
                        }else{
                            if(isAuthenticated) {
                                logout({
                                    returnTo: window.location.origin,
                                })
                            } else {
                                loginWithRedirect();
                            }
                        }
                    }}
                    className="sidebar-list"
                >
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected={props.location.pathname.toString().substring(1) || "home"}>
                        <NavItem eventKey="home">
                            <NavIcon>
                                <FontAwesomeIcon style={{color: '#FDEDEC'}} icon={faHome} />
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="mobility">
                            <NavIcon>
                                <FontAwesomeIcon style={{color: '#FDEDEC'}} icon={faSpaceShuttle} />
                            </NavIcon>
                            <NavText>
                                Mobility
                            </NavText>
                        </NavItem>
                        { isAuthenticated && <NavItem eventKey="profile">
                            <NavIcon>
                                <FontAwesomeIcon style={{color: '#FDEDEC'}} icon={faUser} />
                            </NavIcon>
                            <NavText>
                                Profile
                            </NavText>
                        </NavItem>}
                        <NavItem eventKey="log-in-out" className="login-button" aria-label="sss">
                            <NavIcon>
                                <FontAwesomeIcon style={{color: '#FDEDEC'}} icon={isAuthenticated ? faSignOutAlt : faSignInAlt} />
                            </NavIcon>
                            <NavText>
                                {isAuthenticated ? "Log Out" : "Log In"}
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </ClickOutside>
        </div>);
};

export default Sidebar;