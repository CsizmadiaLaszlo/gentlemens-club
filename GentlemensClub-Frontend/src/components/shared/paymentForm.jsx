import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const PaymentForm = ({onSubmit}) => {
    const handleSubmit = (e) => {
        e.preventDefault()();
        onSubmit(e);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name on Card</Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="1234-5678-9876-5432" />
                <Form.Label>Expiry date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
                <Form.Label>Security code</Form.Label>
                <Form.Control type="text" pattern="[0-9]*" maxLength={3} placeholder="CVV" />
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