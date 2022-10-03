import { useEffect, useState } from 'react';
import LoginModal from "./loginModal";
import RegistrationModal from "./registrationModal";

const LoginStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("jwt") !== null) {
            setLoggedIn(true);
        }
    });

    const loginSuccessHandler = () => {
        setShowLogin(false);
        setLoggedIn(true);
    }

    const registerSuccessHandler = () => {
        setShowRegistration(false);
        setLoggedIn(true);
    } 

    const getName = () => {
        const nameHeader = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        const tokenData = parseJwt(localStorage.getItem("jwt"));
        return tokenData[nameHeader];
    }

    const logOut = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("jwtExpiresAt");
        setLoggedIn(false);
    }

    const [showLogin, setShowLogin] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);

    if (loggedIn) {
        return (
            <ul className={"navbar-nav flex-grow-1"}>
                <li className={"navbar-text"}>
                    <span>Logged in as {getName()}</span>
                </li>
                <li className={"nav-item"}>
                    <button className={"btn btn-link nav-link text-light"} onClick={logOut}>Logout</button>
                </li>
            </ul>
        );
    } else {
        return (
            <ul className={"navbar-nav flex-grow-1"}>
                <li className={"nav-item"}>
                    <button className={"btn btn-link nav-link text-light"} onClick={() => {if (showLogin === false) {setShowLogin(true)}}}>Login</button>
                    <LoginModal show={showLogin} onClose={() => setShowLogin(false)} onSuccess={loginSuccessHandler} />
                </li>
                <li className={"nav-item"}>
                    <button className={"btn btn-link nav-link text-light"} onClick={() => {if (showRegistration === false) {setShowRegistration(true)}}}>Register</button>
                    <RegistrationModal show={showRegistration} onClose={() => setShowRegistration(false)} onSuccess={registerSuccessHandler} />
                </li>
            </ul>
        );
    }
}

function parseJwt (token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
}

export default LoginStatus;