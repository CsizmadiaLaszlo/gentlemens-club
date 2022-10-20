import {GoogleMapsEmbed, OpeningHours} from "../components/contact/contactComponents";
import {ContactForm} from "../components/contact/contactComponents";

const Contact = () => {
    return (
        <>
            <GoogleMapsEmbed/>
            <OpeningHours/>
            <ContactForm/>
        </>
    );
}

export default Contact;