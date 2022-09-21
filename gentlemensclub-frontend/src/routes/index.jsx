import {Footer, Header} from "../components/layout";
import logoWithName from '../assets/img/shared/GC_logo_with_name.jpg';
import {
    Link
} from "react-router-dom";

export default function Index() {
    return (
        <div>
            <Header></Header>
            <div className={"container"}>
                <main role={"main"} className={"pb-3"}>
                    <div className={"text-center"} style={{marginBottom: 50}}>
                        <h1 className={"display-4"}>Gentlemen's Club</h1>
                    </div>
                    <div className={"d-flex flex-row"}>

                        <div id={"index-logo-container"}>
                            <Link to={`/service`} className={"navbar-brand text-center"}>
                                <img src={logoWithName} alt={"Gentlemen's Club logo with company name."}/>
                            </Link>
                        </div>

                        <div className={"d-flex align-items-center"} id={"index-content"}>
                            <p style={{textAlign: "justify"}}>
                                Welcome Gentleman!
                                <br/><br/>
                                If you are looking for a place with traditions, but also with modern services as the
                                21th
                                century determines the modern businessman, you are on the perfect place.
                                <br/><br/>
                                As the Gentlemen's Club is the odlest in its kind in New York city, a membership at our
                                club means
                                unique occasion to meet traditional businessmen. On the other hand, with the services of
                                our Bank,
                                members are able to make investments on several financial markets. For these kid of
                                investments,
                                we offer weel-trained financial consultants, to whom you can book appointments online.
                                <br/><br/>
                                If you are a member, please log in, at the top-right corner, or if you like to see
                                more, just click
                                on our logo on the left.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            <Footer></Footer>
        </div>
    );
}