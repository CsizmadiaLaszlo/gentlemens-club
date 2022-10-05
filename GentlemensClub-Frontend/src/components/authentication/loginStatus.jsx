import { useState, useContext } from 'react';
import { deleteJwtToken, getUser, getUserFromJwt } from '../../services/authentication/authenticationUtils';
import UserContext from '../../services/authentication/userContext';
import LoginModal from "./loginModal";
import RegistrationModal from "./registrationModal";

const LoginStatus = () => {
    const { user, setUser } = useContext(UserContext);

    const loginSuccessHandler = () => {
        setShowLogin(false);
        setUser(getUserFromJwt());
    }

    const registerSuccessHandler = () => {
        setShowRegistration(false);
        setUser(getUserFromJwt());
    } 

    const logOut = () => {
        deleteJwtToken();
        setUser(null);
    }

    const [showLogin, setShowLogin] = useState(false);
    const [showRegistration, setShowRegistration] = useState(false);

    if (user !== null) {
        return (
            <ul className={"navbar-nav flex-grow-1"}>
                <li className={"navbar-text"}>
                    <span>Logged in as {user.name}</span>
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

export default LoginStatus;