import {Footer, Header} from "../components/layout";
import Healthcare from "./healthcare";

export default function Contact() {
    return (
        <div>
            <Header></Header>
            <div className={"container"}>
                <main role={"main"} className={"pb-3"}>
                    <div id="cotact-map" style={{display: "flex", justifyContent: "center", paddingBottom: "40px"}}>
                        {/*TODO get a react google map loader*/}
                        {/*<div className="mapouter">*/}
                        {/*    <div className="gmap_canvas">*/}
                        {/*        <iframe width="657" height="761" id={"gmap_canvas"}*/}
                        {/*                src="https://maps.google.com/maps?q=150W%2059th%20street,%20New%20York&t=k&z=17&ie=UTF8&iwloc=&output=embed">*/}
                        {/*        </iframe>*/}
                        {/*        <br>*/}
                        {/*            <style>.mapouter{position:relative;text-align:right;height:761px;width:657px;}</style>*/}
                        {/*            <a href="https://www.embedgooglemap.net">embedgooglemap.net</a>*/}
                        {/*            <style>.gmap_canvas {overflow:hidden;background:none!important;height:761px;width:657px;}</style>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
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
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}