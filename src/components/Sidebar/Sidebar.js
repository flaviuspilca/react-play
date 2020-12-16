import React, {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import SideNav, {NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAuth0} from "@auth0/auth0-react";
import ClickOutside from "react-click-outside";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {SidebarContext} from "../../App";
import "./Sidebar.scss";


const Sidebar = (props) => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
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
                        {
                            props.config.map((item, index)=>(
                                item.show ? <NavItem
                                    key={index}
                                    eventKey={item.pageName.toLowerCase()}
                                    className={item.pageName.toLowerCase() === "log-in-out" ? "login-button":""}
                                >
                                    <NavIcon>
                                        <FontAwesomeIcon style={{color: '#FDEDEC'}} icon={item.icon} />
                                    </NavIcon>
                                    <NavText>
                                        {item.pageName.toLowerCase() === "log-in-out" ?  (isAuthenticated ? "Log Out" : "Log In") : item.pageName}
                                    </NavText>
                                </NavItem> : ""
                            ))
                        }
                    </SideNav.Nav>
                </SideNav>
            </ClickOutside>
        </div>);
};

export default Sidebar;