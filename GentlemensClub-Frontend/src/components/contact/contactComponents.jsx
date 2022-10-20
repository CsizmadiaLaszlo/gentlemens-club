import {getJwtToken} from "../../services/authentication/authenticationUtils";
import React, {useState} from "react";
import {GoogleMap} from "../shared.jsx";
import {Link, Outlet} from "react-router-dom";

export const ContactContainer = () => {
    return <Outlet/>
}

export const GoogleMapsEmbed = () => {
    return (
        <div id="contact-map" style={{display: "flex", justifyContent: "center", paddingBottom: "40px"}}>
            {GoogleMap("150 central park s new york ny 10019", 500, 400)}
        </div>
    )
}

export const ContactMessageLink = () => {
    return (
        <div className="text-center">
            <Link className={"btn btn-outline-secondary"} to={"/contact/message"}>Send message</Link>
        </div>
    )
}

export const OpeningHours = () => {
    return (
        <>
            <div id="contact-opening-hours-body">
                <tr>
                    <th>
                        <h3>Opening hours</h3>
                    </th>
                </tr>
                <table>
                    <tr>
                        <td><strong>Monday</strong></td>
                        <td>6:00 - 23:00</td>
                    </tr>
                    <tr>
                        <td><strong>Tuesday</strong></td>
                        <td>6:00 - 23:00</td>
                    </tr>
                    <tr>
                        <td><strong>Wednesday</strong></td>
                        <td>6:00 - 23:00</td>
                    </tr>
                    <tr>
                        <td><strong>Thursday</strong></td>
                        <td>6:00 - 23:00</td>
                    </tr>
                    <tr>
                        <td><strong>Friday</strong></td>
                        <td>6:00 - 00:00</td>
                    </tr>
                    <tr>
                        <td><strong>Saturday</strong></td>
                        <td>9:00 - 02:00</td>
                    </tr>
                    <tr>
                        <td><strong>Sunday</strong></td>
                        <td>9:00 - 18:00</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export const ContactForm = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            Message: message,
            EmailAddress: email
        }

        alert("Your message has been sent.")

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
            <h5 className="text-center" style={{paddingTop: "10px"}}>If you have questions, please fill the form at the bottom:</h5>
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