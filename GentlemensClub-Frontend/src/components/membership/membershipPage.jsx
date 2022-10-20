import { useState } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Modal } from "../shared/modal";
import PaymentForm from "../shared/paymentForm";

const MemberShipPage = () => {
    const cardClasses = "bg-dark text-light border-secondary p-2";
    const [showModal, setShowModal] = useState(false);
    const [tier, setTier] = useState(null);

    const navigate = useNavigate();

    const handleSubscribeForm = (formData) => {
        setShowModal(false);
        // TODO handling subscription request
        navigate("/");
    }

    const cards = [
        {
            title: "Bronze Membership",
            price: "$9.99 / month",
            features: [
                "Awesome feature",
                "Another awesome feature",
            ],
            tier: 1,
        },
        {
            title: "Silver Membership",
            price: "$99.90 / month",
            features: [
                "Awesome feature",
                "Another awesome feature",
                "Cool feature"
            ],
            tier: 2,
        },
        {
            title: "Gold Membership",
            price: "$999.00 / month",
            features: [
                "Awesome feature",
                "Another awesome feature",
                "Cool feature",
                "Best feature"
            ],
            tier: 3,
        },
    ]

    return (
        <>
            <CardGroup>
                {cards.map(({ title, price, features, tier }) => {
                    return (
                        <Card key={tier} border="light" bg="dark">
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <p>{price}</p>
                                <div className="text-center">
                                    <Button variant="primary" onClick={() => {
                                        setShowModal(true);
                                        setTier(tier);
                                    }
                                    }>Subscribe now</Button>
                                </div>
                                <hr></hr>
                                <ul className="list">
                                    {features.map((feature) => {
                                        return (
                                            <li key={feature}>{feature}</li>
                                        );
                                    })}
                                </ul>
                            </Card.Body>
                        </Card>
                    );
                })
                }
            </CardGroup>
            <Modal
                show={showModal}
                title={"Payment"}
                body={<PaymentForm onSubmit={handleSubscribeForm} />}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

export default MemberShipPage;