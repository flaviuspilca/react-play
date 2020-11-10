import React from "react";

import NavButtons from "./nav-buttons";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

import { useAuth0 } from "@auth0/auth0-react";


const NavBar = () => {
    const { isAuthenticated } = useAuth0();

    return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <NavButtons />
            <div className="navbar-nav ml-auto">
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
