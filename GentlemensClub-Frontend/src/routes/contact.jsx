import {GoogleMap} from "../components/shared.jsx";

const Contact = () => {
    return (
        <>
            <div id="cotact-map" style={{display: "flex", justifyContent: "center", paddingBottom: "40px"}}>
                {GoogleMap("150W%2059th%20street", 600, 600)}
            </div>

            <h5 className="text-center">If you have questions, please fill the form at the bottom:</h5>

            <div id="contact-form" className="d-flex justify-content-center" style={{paddingTop: "10px"}}>
                <div className="card bg-black text-light text-center" style={{width: "33rem"}}>
                    <form>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="contactMessage">Message:</label>
                                <textarea className="form-control" placeholder="Please add your message here."
                                          id="contactMessage" name="contactMessage"></textarea>
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="contactEmail">Your e-mail address:</label>
                                <input type="email" className="form-control" id="contactEmail"
                                       name="contactEmail"
                                       pattern={"^[a-zA-Z0-9._+-]+@(\"@\")[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,9}$"}
                                       placeholder="example@domain.com"/>
                            </div>
                            <br/>
                            <button type="submit" className="btn btn-dark">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;