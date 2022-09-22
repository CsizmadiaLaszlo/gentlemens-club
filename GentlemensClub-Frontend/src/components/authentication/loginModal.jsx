import React, { useState } from 'react';
import { Modal } from "../shared/modal.jsx";

export function LoginModal(props) {
    const modalBody = (
        <LoginForm />
    );

    return (
        <Modal show={props.show} onClose={props.onClose} title="Login" body={modalBody} />
    );
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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
    
    handleSubmit(event) {
        console.log(this.state.username);
        event.preventDefault();
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
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