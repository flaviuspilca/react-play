import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";

const LogStateButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
      <div>
          <button
              className={isAuthenticated ? "btn bg-transparent" : "btn bg-transparent"}
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
              <FontAwesomeIcon icon={isAuthenticated ? faSignOutAlt : faSignInAlt} /> {isAuthenticated ? "Log Out" : "Log In"}
          </button>
      </div>
  );
};

export default LogStateButton;
