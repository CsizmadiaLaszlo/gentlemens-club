import React from "react";
import { Modal } from "../shared/modal.jsx";


export function RegistrationModal(props) {
    const modalBody = (
        <RegistrationForm onSuccess={props.onSuccess} />
    );

    return (
        <Modal show={props.show} onClose={props.onClose} title="Login" body={modalBody} />
    );
}

export class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }

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

    async requestAccountRegistration(username, email, password, confirmPassword) {
        const url = "api/authentication/register";

        const credentials = {
            "username": username,
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword
        };

        console.log(credentials);

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

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: null });
        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const confirmPassword = this.state.confirmPassword;

        if (password !== confirmPassword) {
            const error = "Password confirmation doesn't match Password."
            this.setState({ error });
            return;
        }

        const response = await this.requestAccountRegistration(username, email, password, confirmPassword);
        if (response.status === 409) {
            this.setState({ error: "This username or e-mail address is already taken." });
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

    render() {
        return (
            <form onSubmit={async (event) => { await this.handleSubmit(event) }}>
                <div className='text-danger'>{this.state.error !== null && this.state.error}</div>
                <div className={"mb-3"}>
                    <label className={"form-label"}>Username:</label>
                    <input className={"form-control"} onChange={this.handleInputChange} type="text" name="username" />

                </div>
                <div className={"mb-3"}>
                    <label className={"form-label"}>E-mail address:</label>
                    <input className={"form-control"} onChange={this.handleInputChange} type="email" name="email" />

                </div>
                <div className={"mb-3"}>
                    <label className={"form-label"}>Password:</label>
                    <input className={"form-control"} onChange={this.handleInputChange} type="password" name="password" />

                </div>
                <div className={"mb-3"}>
                    <label className={"form-label"}>Confirm Password:</label>
                    <input className={"form-control"} onChange={this.handleInputChange} type="password" name="confirmPassword" />
                </div>
                <div>
                    <input type="submit" className={"btn btn-dark"} value="Register" />
                </div>
            </form>
        );
    }
}