import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createOffer } from "../../services/offerService";
import { AuthContext } from "../../contexts/AuthContext";
import { OfferContext } from "../../contexts/OfferContext";

const CreateOffer = function () {


    const { userToken, userProfileInfo } = useContext(AuthContext)
    const { maxOfferId } = useContext(OfferContext)

    const initialState = {
        id: maxOfferId + 1,
        product: '',
        client: '',
        size: '',
        quantity: '',
        types: '',
        print: '',
        finishing: '',
        external: '',
        notes: '',
        author_id: userToken.uid,
    }

    const [values, setValues] = useState(initialState);



    const handleChange = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createOffer(values)
        setValues({ ...initialState });
    }

    return (
        <div className="create-offer-container" >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicSurame">
                    <Form.Label>Offer Number: <b>{values.id}</b></Form.Label>
                    <hr></hr>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="product" placeholder="Enter Product" value={values.product} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicSurame">
                    <Form.Label>Client</Form.Label>
                    <Form.Control type="text" name="client" placeholder="Enter Client" value={values.client} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTel">
                    <Form.Label>Dimensions L x W x H mm</Form.Label>
                    <Form.Control type="number" name="size" placeholder="Enter Dimensions" value={values.size} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTel">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="quantity" placeholder="Enter Quantity" value={values.quantity} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTel">
                    <Form.Label>Types</Form.Label>
                    <Form.Control type="number" name="types" placeholder="Enter Types" value={values.types} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTel">
                    <Form.Label>Print</Form.Label>
                    <Form.Control type="text" name="print" placeholder="Enter Print" value={values.print} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTel">
                    <Form.Label>Finishing</Form.Label>
                    <Form.Control type="text" name="finishing" placeholder="Enter Finishing" value={values.finishing} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTel">
                    <Form.Label>External</Form.Label>
                    <Form.Control type="text" name="external" placeholder="Enter External" value={values.external} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTel">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control type="text" name="notes" placeholder="Enter Notes" value={values.notes} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create offer
                </Button>
            </Form>
        </div >
    );
};

export default CreateOffer;