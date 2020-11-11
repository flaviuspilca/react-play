import React from "react";

import NavButtons from "./nav-buttons";

import { useAuth0 } from "@auth0/auth0-react";


const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <NavButtons />
            <div className="navbar-nav ml-auto">
                <button
                    className={isAuthenticated ? "btn btn-danger btn-block" : "btn btn-primary btn-block"}
                    onClick={() => {
                        if(isAuthenticated) {
                            logout({
                                returnTo: window.location.origin,
                            })
                        } else {
                            loginWithRedirect();
                        }
                    }}
                >
                    {isAuthenticated ? "Log Out" : "Log In"}
                </button>
            </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
