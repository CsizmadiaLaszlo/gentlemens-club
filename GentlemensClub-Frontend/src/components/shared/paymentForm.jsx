import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const PaymentForm = ({onSubmit}) => {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name,
            cardNumber,
            expiryDate,
            cvv
        }
        onSubmit(formData);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name on Card</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required placeholder="1234-5678-9876-5432" />
                <Form.Label>Expiry date</Form.Label>
                <Form.Control type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required placeholder="MM/YY" />
                <Form.Label>Security code</Form.Label>
                <Form.Control type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} required pattern="[0-9]*" maxLength={3} placeholder="CVV" />
                <div className="my-3 d-grid">
                    <Button className={"btn-block"} variant="primary" type="submit">
                        Subscribe
                    </Button>
                </div>
            </Form>
        </>
    );
}

export default PaymentForm;