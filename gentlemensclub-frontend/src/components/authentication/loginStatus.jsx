import { useState } from 'react';
import { LoginModal } from "./loginModal.jsx";

export function LoginStatus() {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <ul className={"navbar-nav flex-grow-1"}>
            <li className={"nav-item"}>
                <button className={"btn btn-link nav-link text-light"} onClick={() => setShowLogin(true)}>Login</button>
                <LoginModal show={showLogin} />
            </li>
            <li className={"nav-item"}>
                <button className={"btn btn-link nav-link text-light"}>Register</button>
            </li>
        </ul>
    );
}