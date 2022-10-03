import bank_pic from "../assets/img/home/Bank_vertical.jpg"
import contact_pic from "../assets/img/home/Contact_vertical.jpg"
import fitness_pic from "../assets/img/home/Fitness_vertical.jpg"
import food_pic from "../assets/img/home/Food_vertical.jpg"
import healthcare_pic from "../assets/img/home/Healthcare_vertical.jpg"
import membership_pic from "../assets/img/home/Membership_vertical.jpg"
import {Link} from "react-router-dom";

const Service = () => {
    return (
        <>
            <div className={"text-center"}>
                <h1 className={"display-4"}>Services</h1>
            </div>
            <br/><br/>
            <div className={"row row-cols-1 row-cols-md-3 g-4"}>
                <div className="col">
                    <div className="card bg-black text-light" style={{width: "18rem"}}>
                        <img className={"card-img-top"} src={food_pic}
                             alt={"Medium steak, sliced into strips."}/>
                        <div className="card-body">
                            <h5 className="card-title">Restaurant</h5>
                            <p className="card-text">The finest meals in town, only for those gentlemen who
                                really value the extraordinary.</p>
                            <div className="text-center">
                                <Link className={"btn btn-dark"} to={"/restaurant"}>Go to Restaurant</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-black text-light" style={{width: "18rem"}}>
                        <img className={"card-img-top"} src={fitness_pic}
                             alt={"Swimming pool from a wellness centre."}/>
                        <div className="card-body">
                            <h5 className="card-title">Fitness/Wellness</h5>
                            <p className="card-text">A fitness centre and a wellness complex for physical
                                and mental health.</p>
                            <div className="text-center">
                                <Link className={"btn btn-dark"} to={"/fitness"}>Go to Fitness/Wellness</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-black text-light" style={{width: "18rem"}}>
                        <img className={"card-img-top"} src={healthcare_pic}
                             alt={"Doctor, reading some documentation."}/>
                        <div className="card-body">
                            <h5 className="card-title">Private healthcare</h5>
                            <p className="card-text">Exclusive medical screenings and services by the
                                special needs of a gentleman.</p>
                            <div className="text-center">
                                <Link className={"btn btn-dark"} to={"/healthcare"}>Go to Private healthcare page</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-black text-light" style={{width: "18rem"}}>
                        <img className={"card-img-top"} src={membership_pic}
                             alt={"Two man, having a handshake with each other."}/>
                        <div className="card-body">
                            <h5 className="card-title">Membership</h5>
                            <p className="card-text">A 100 years of tradition. A unique place for gentlemen,
                                where seisure meets business.</p>
                            <div className="text-center">
                                <Link className={"btn btn-dark"} to={"/membership"}>Go to Membership page</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-black text-light" style={{width: "18rem"}}>
                        <img className={"card-img-top"} src={bank_pic}
                             alt={"Man, doing finance related work on a notebook, with a bankcard in his hand."}/>

                        <div className="card-body">
                            <h5 className="card-title">Finance</h5>
                            <p className="card-text">Online banking and investment solutions, private
                                counseling, for members only.</p>
                            <div className="text-center">
                                <Link className={"btn btn-dark"} to={"/finance"}>Go to Finance</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card bg-black text-light" style={{width: "18rem"}}>
                        <img className={"card-img-top"} src={contact_pic}
                             alt={"The location of the Gentlemen's Club, on a map."}/>

                        <div className="card-body">
                            <h5 className="card-title">Contact</h5>
                            <p className="card-text">Basic information about the Gentlemen's Club. Address,
                                contacts, opening hours.</p>
                            <div className="text-center">
                                <Link className={"btn btn-dark"} to={"/contact"}>Go to Contact page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Service;