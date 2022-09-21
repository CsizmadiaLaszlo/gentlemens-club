import { useState } from 'react';
import { Modal } from "../shared/modal.jsx";

export function LoginModal(props) {
    const [showModal, setShowModal] = useState(false);

    const modalBody = (
        <div>
            <p>
                TODO: Login form
            </p>
        </div>
    );

    return (
        <Modal show={props.show} title="Login" body={modalBody}/>
    );
}