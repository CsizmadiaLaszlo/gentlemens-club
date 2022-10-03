import React, { useState} from "react";
import { Modal } from "../shared/modal.jsx";
import { requestAccountRegistration } from "../../js/authentication/authenticationUtils.js";


const RegistrationModal = ({ show, onSuccess, onClose }) => {
    const modalBody = (
        <RegistrationForm onSuccess={onSuccess} />
    );

    return (
        <Modal show={show} onClose={onClose} title="Login" body={modalBody} />
    );
}


const RegistrationForm = ({ onSuccess }) => {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (e) => {
        const setters = {
            error: setError,
            username: setUsername,
            email: setEmail,
            password: setPassword,
            confirmPassword: setConfirmPassword,
        };

        const name = e.target.name;
        const value = e.target.value;

        setters[name](value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Password confirmation doesn't match Password.");
            return;
        }

        const response = await requestAccountRegistration(username, email, password, confirmPassword);
        if (response.status === 409) {
            setError("This username or e-mail address is already taken.");
            return;
        }
        else if (response.status !== 200) {
            setError("Something went wrong...");
            return;
        }

        const data = await response.json();
        const token = data.access_token;
        const expiresAt = data.expires_at;

        localStorage.setItem("jwt", token);
        localStorage.setItem("jwtExpiresAt", new Date(expiresAt).toUTCString());

        onSuccess();
    };

    return (
        <form onSubmit={async (event) => { await handleSubmit(event) }}>
            <div className='text-danger'>{error !== null && error}</div>
            <div className={"mb-3"}>
                <label className={"form-label"}>Username:</label>
                <input className={"form-control"} onChange={handleInputChange} type="text" name="username" />

            </div>
            <div className={"mb-3"}>
                <label className={"form-label"}>E-mail address:</label>
                <input className={"form-control"} onChange={handleInputChange} type="email" name="email" />

            </div>
            <div className={"mb-3"}>
                <label className={"form-label"}>Password:</label>
                <input className={"form-control"} onChange={handleInputChange} type="password" name="password" />

            </div>
            <div className={"mb-3"}>
                <label className={"form-label"}>Confirm Password:</label>
                <input className={"form-control"} onChange={handleInputChange} type="password" name="confirmPassword" />
            </div>
            <div>
                <input type="submit" className={"btn btn-dark"} value="Register" />
            </div>
        </form>
    );
}


export default RegistrationModal;