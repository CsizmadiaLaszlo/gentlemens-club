import React, { useState } from 'react';
import { Modal } from "../shared/modal.jsx";

const LoginModal = ({ show, onSuccess, onClose }) => {
    const modalBody = (
        <LoginForm onSuccess={onSuccess} />
    );

    return (
        <Modal show={show} onClose={onClose} title="Login" body={modalBody} />
    );
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: null,
            username: "",
            password: "",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: null });
        const username = this.state.username;
        const password = this.state.password;

        const response = await this.requestJwtToken(username, password)
        if (response.status === 401) {
            this.setState({ error: "The username or password is incorrect. Try again!" });
            return;
        }
        else if (response.status !== 200) {
            this.setState({ error: "Something went wrong..." });
            return;
        }
        const data = await response.json();
        const token = data.access_token;
        const expiresAt = data.expires_at;

        localStorage.setItem("jwt", token);
        localStorage.setItem("jwtExpiresAt", new Date(expiresAt).toUTCString());

        this.props.onSuccess();
    }

    async requestJwtToken(username, password) {
        const url = "api/authentication/authenticate";

        const credentials = {
            "username": username,
            "password": password
        };

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        };

        const response = await fetch(url, options);

        return response;
    }

    render() {
        return (
            <form onSubmit={async (event) => { await this.handleSubmit(event) }}>
                <div className='text-danger'>{this.state.error !== null && this.state.error}</div>
                <div className={"mb-3"}>
                    <label className={"form-label"}>Username:</label>
                    <input className={"form-control"} onChange={this.handleInputChange} type="text" name="username" />
                </div>
                <div className={"mb-3"}>
                    <label className={"form-label"} asp-for="Password">Password:</label>
                    <input className={"form-control"} onChange={this.handleInputChange} type="password" name="password" />
                </div>
                <div>
                    <input type="submit" className={"btn btn-dark"} value="Login" />
                </div>
            </form>
        );
    }
}

export default LoginModal;
