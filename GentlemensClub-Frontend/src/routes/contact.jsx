import {
    GoogleMapsEmbed,
    OpeningHours,
    ContactMessageLink
} from "../components/contact/contactComponents";

const Contact = () => {
    return (
        <>
            <div className="contact-grid-center" style={{paddingTop: "10px"}}>
                <GoogleMapsEmbed/>
                <OpeningHours/>
            </div>
            <ContactMessageLink/>
        </>
    );
}

export default Contact;