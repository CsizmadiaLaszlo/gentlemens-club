import React, {useState} from "react";
import {GoogleMap} from "../components/shared.jsx";
import {getJwtToken} from "../services/authentication/authenticationUtils";

const Contact = () => {
    return (
        <>
            <GoogleMapsEmbed/>
            <ContactForm/>
        </>
    );
}

const GoogleMapsEmbed = () => {
    return (
        <div id="cotact-map" style={{display: "flex", justifyContent: "center", paddingBottom: "40px"}}>
            {GoogleMap("150 central park s new york ny 10019", 600, 600)}
        </div>
    )
}

const ContactForm = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            Message: message,
            EmailAddress: email
        }

        return fetch("/api/contact/save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + getJwtToken(),
            },
            body: JSON.stringify(formData)
        })
    }

    return (
        <>
            <h5 className="text-center">If you have questions, please fill the form at the bottom:</h5>
            <div id="contact-form" className="d-flex justify-content-center" style={{paddingTop: "10px"}}>
                <div className="card bg-black text-light text-center" style={{width: "33rem"}}>

                    <form onSubmit={async (event) => {
                        await handleSubmit(event)
                    }}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="contactMessage">Message:</label>
                                <input type="text" className="form-control" placeholder="Please add your message here."
                                          id="contactMessage" name="contactMessage"
                                          onChange={e => setMessage(e.target.value)}/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="contactEmail">Your e-mail address:</label>
                                <input type="email" className="form-control" id="contactEmail"
                                       name="contactEmail"
                                       placeholder="example@domain.com"
                                       onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <br/>
                            <input type="submit" className="btn btn-dark" value="Submit" />
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Contact;