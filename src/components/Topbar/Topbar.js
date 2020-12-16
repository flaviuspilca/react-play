import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import "./Topbar.scss";

const Topbar = (props) => {
    const {isAuthenticated, loginWithRedirect, logout, user} = useAuth0();
    const [currentPage, setCurrentPage] = useState(props.currentLocation || props.location.pathname.slice(1) || "Home");
    const history = useHistory();
    return (
    <div className="nav-container">
        <Navbar expand="lg"
                collapseOnSelect="true"
                className="custom-nav"
                onSelect={(selected) => {
                if( selected !== 'log-in-out') {
                    const navigateTo = '/' + selected;
                    setCurrentPage(selected);
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
            }}>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Brand className="app-name">
                <a href="https://github.com/flaviuspilca/react-play" target="_blanc"><span className="image-logo"></span></a>
                <span className="app-title"><h3>{currentPage === props.location.pathname.slice(1).toLowerCase() ? currentPage : props.currentLocation || "Home"} page</h3></span>
            </Navbar.Brand>

            <Nav className="ml-auto">
                <Navbar.Text>
                    <h3>
                        {isAuthenticated ? "Welcome " + user.name : "Welcome! You are not logged in!"}
                    </h3>
                </Navbar.Text>
            </Nav>
            {isAuthenticated && <Navbar.Brand>
                <img
                    src={user.picture}
                    alt="Profile"
                    className="rounded-circle"
                />
            </Navbar.Brand>}

            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    {
                        props.config.map((item, index) => (
                            item.show ? <Nav.Link
                                key={index}
                                href="#"
                                eventKey={item.pageName.toLowerCase()}
                            >
                                <h3>{item.pageName.toLowerCase() === "log-in-out" ?  (isAuthenticated ? "Log Out" : "Log In") : item.pageName}</h3>
                            </Nav.Link> : ""
                        ))
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
};

export default Topbar;
