import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import {useAuth0} from "@auth0/auth0-react";
import UserContext from "../Context/context";
import "./Topbar.scss";

const Topbar = (props) => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const history = useHistory();

    return (
    <div className="nav-container">
        <Navbar expand="lg" collapseOnSelect="true" className="custom-nav" onSelect={(selected) => {
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
            }}>
            <Navbar.Brand href="/home">
                <span className="image-logo"></span>
                <span>The Playground</span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="ml-auto">
                <Navbar.Text>{isAuthenticated ? "Welcome " + user.name : "Welcome! You are not logged in"}</Navbar.Text>
            </Nav>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    <Nav.Link href="#" eventKey="home">Home</Nav.Link>
                    <Nav.Link href="#" eventKey="mobility">Mobility</Nav.Link>
                    { isAuthenticated && <Nav.Link href="#" eventKey="profile">Profile</Nav.Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  );
};

export default Topbar;
