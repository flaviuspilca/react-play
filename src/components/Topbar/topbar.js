import React from "react";
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './topbar.scss';
import {useAuth0} from "@auth0/auth0-react";

const Topbar = (props) => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    const history = useHistory();

    return (
    <div className="nav-container">
            <Navbar expand="lg" collapseOnSelect="true" onSelect={(selected) => {
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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="ml-auto">
                <Navbar.Text>Welcome {user.name}</Navbar.Text>

            </Nav>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    <Nav.Link href="#" eventKey="home">Home</Nav.Link>
                    { isAuthenticated && <Nav.Link href="#" eventKey="external-api">External API</Nav.Link>}
                    { isAuthenticated && <Nav.Link href="#" eventKey="profile">Profile</Nav.Link>}
                </Nav>
            </Navbar.Collapse>

        </Navbar>
    </div>
  );
};

export default Topbar;
