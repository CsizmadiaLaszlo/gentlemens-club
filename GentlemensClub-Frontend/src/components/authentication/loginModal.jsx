import React, { useState } from 'react';
import { Modal } from "../shared/modal.jsx";
import { requestJwtToken, saveJwtToken } from '../../js/authentication/authenticationUtils.js';

const LoginModal = ({ show, onSuccess, onClose }) => {
    const modalBody = (
        <LoginForm onSuccess={onSuccess} />
    );

    return (
        <Modal show={show} onClose={onClose} title="Login" body={modalBody} />
    );
};

const LoginForm = ({ onSuccess }) => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        const response = await requestJwtToken(username, password)
        if (response.status === 401) {
            setError("The username or password is incorrect. Try again!");
            return;
        }
        else if (response.status !== 200) {
            setError("Something went wrong...");
            return;
        }
        const data = await response.json();
        const token = data.access_token;
        const expiresAt = data.expires_at;

        saveJwtToken(token, expiresAt);

        onSuccess();
    }

    return (
        <form onSubmit={async (event) => { await handleSubmit(event) }}>
            <div className='text-danger'>{error !== null && error}</div>
            <div className={"mb-3"}>
                <label className={"form-label"}>Username:</label>
                <input className={"form-control"} onChange={e => setUsername(e.target.value)} type="text" name="username" />
            </div>
            <div className={"mb-3"}>
                <label className={"form-label"} asp-for="Password">Password:</label>
                <input className={"form-control"} onChange={e => setPassword(e.target.value)} type="password" name="password" />
            </div>
            <div>
                <input type="submit" className={"btn btn-dark"} value="Login" />
            </div>
        </form>
    );
};

export default LoginModal;
