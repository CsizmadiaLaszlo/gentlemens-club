import { useContext } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import UserContext from "../services/authentication/userContext";

const Membership = () => {
    const { user } = useContext(UserContext);

    if (user === null) {
        return (
            <>
                <div>
                    Please log in to access this page!
                </div>
            </>
        );
    }

    return (
        <MemberShipPage />
    );
}

const MemberShipPage = () => {
    const cardClasses = "bg-dark text-light border-secondary p-2";

    const cards = [
        {
            title: "Bronze Membership",
            price: "$9.99 / month",
            features: [
                "Awesome feature",
                "Another awesome feature",
            ]
        },
        {
            title: "Silver Membership",
            price: "$99.90 / month",
            features: [
                "Awesome feature",
                "Another awesome feature",
                "Cool feature"
            ]
        },
        {
            title: "Gold Membership",
            price: "$999.00 / month",
            features: [
                "Awesome feature",
                "Another awesome feature",
                "Cool feature",
                "Best feature"
            ]
        },
    ]

    return (
        <>
            <CardGroup>
                {cards.map(({ title, price, features }) => {
                    return (
                        <>
                            <Card border="light" bg="dark">
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>
                                        <p>{price}</p>
                                        <div className="text-center">
                                            <Button variant="primary">Subscribe now</Button>
                                        </div>
                                        <hr></hr>
                                        <ul className="list">
                                            {features.map((feature) => {
                                                return (
                                                    <>
                                                        <li>{feature}</li>
                                                    </>
                                                );
                                            })}
                                        </ul>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </>
                    );
                })
                }
            </CardGroup>
        </>
    );
};

export default Membership;