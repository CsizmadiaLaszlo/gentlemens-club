import { useState } from 'react';
import { Modal } from "../shared/modal.jsx";

export function LoginModal(props) {
    const modalBody = (
        <form>
            <div className={"text-danger"}></div>
            <div class="mb-3">
                <label className={"form-label"}>
                    Username:
                    <input className={"form-control"} type="text" name="username" />
                </label>
            </div>
            <div className={"mb-3"}>
                <label className={"form-label"} asp-for="Password">
                    Password:
                    <input className={"form-control"} type="password" name="password" />
                </label>
            </div>
            <div>
                <input type="submit" className={"btn btn-dark"} value="Login" />
            </div>
        </form>
    );

    return (
        <Modal show={props.show} onClose={props.onClose} title="Login" body={modalBody} />
    );
}