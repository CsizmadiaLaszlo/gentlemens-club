import React, { useState } from 'react';
import { Modal } from "../shared/modal.jsx";

export function LoginModal(props) {
    const modalBody = (
        <LoginForm onSuccess={props.onSuccess}/>
    );

    return (
        <Modal show={props.show} onClose={props.onClose} title="Login" body={modalBody} />
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
        this.setState({error: null});
        const username = this.state.username;
        const password = this.state.password;

        console.log(username);
        const response = await this.requestJwtToken(username, password)
        if (response.status === 401) {
            this.setState({error: "The username or password is incorrect. Try again!"});
            return;
        }
        else if (response.status !== 200) {
            this.setState({error: "Something went wrong..."});
            return;
        }

        this.props.onSuccess();
        const data = await response.json();
        const token = data.access_token;

        console.log(token);
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
        return(
            <form onSubmit={async (event) => {await this.handleSubmit(event)}}>
                <div className='text-danger'>{this.state.error !== null && this.state.error}</div>
                <div className={"mb-3"}>
                    <label className={"form-label"}>
                        Username:
                        <input className={"form-control"} onChange={this.handleInputChange} type="text" name="username" />
                    </label>
                </div>
                <div className={"mb-3"}>
                    <label className={"form-label"} asp-for="Password">
                        Password:
                        <input className={"form-control"} onChange={this.handleInputChange} type="password" name="password" />
                    </label>
                </div>
                <div>
                    <input type="submit" className={"btn btn-dark"} value="Login" />
                </div>
            </form>
        );
    }
}