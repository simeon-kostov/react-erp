import { Button, Form, Table } from "react-bootstrap";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const OfferReview = function () {

    const { userToken, userProfileInfo } = useContext(AuthContext)
    const [specificOffer, setSpecificOffer] = useState('')
    const { offerId } = useParams()
    const [isMutable, setEditor] = useState(false)

    useEffect(() => {
        getSpecificOffer(offerId)
    }, [])

    async function getSpecificOffer(offerId) {
        await db.collection('offers').doc(offerId).get().then(offerInDB => {
            const offer = {
                uid: '',
                data: {
                    id: '',
                    product: '',
                    client: '',
                    size: '',
                    quantity: '',
                    types: '',
                    print: '',
                    finishing: '',
                    external: '',
                    notes: '',
                    author_id: ''
                }
            }
            offer.uid = offerInDB.id;
            for (const key of Object.keys(offer.data)) {
                offer.data[key] = offerInDB.data().values[key]
            }
            setSpecificOffer(offer)
        })
    }


    // function handleUpdagteSubmit() {
    //     setEditor(true)
    // }

    if (userToken && specificOffer && (userToken.uid !== specificOffer.data.author_id)) {
        return (
            <div className="create-offer-container" >
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicSurame">
                        <Form.Label>Offer Number: <b>{specificOffer.data.id}</b></Form.Label>
                        <hr></hr>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="product" placeholder="Enter Product" defaultValue={specificOffer.data.product} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurame">
                        <Form.Label>Client</Form.Label>
                        <Form.Control type="text" name="client" placeholder="Enter Client" defaultValue={specificOffer.data.client} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Dimensions L x W x H mm</Form.Label>
                        <Form.Control type="number" name="size" placeholder="Enter Dimensions" defaultValue={specificOffer.data.size} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" name="quantity" placeholder="Enter Quantity" defaultValue={specificOffer.data.quantity} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Types</Form.Label>
                        <Form.Control type="number" name="types" placeholder="Enter Types" defaultValue={specificOffer.data.types} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Print</Form.Label>
                        <Form.Control type="text" name="print" placeholder="Enter Print" defaultValue={specificOffer.data.print} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Finishing</Form.Label>
                        <Form.Control type="text" name="finishing" placeholder="Enter Finishing" defaultValue={specificOffer.data.finishing} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>External</Form.Label>
                        <Form.Control type="text" name="external" placeholder="Enter External" defaultValue={specificOffer.data.external} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" name="notes" placeholder="Enter Notes" defaultValue={specificOffer.data.notes} disabled />
                    </Form.Group>
                    {/* <Button variant="primary" type="submit" onClick={handleUpdagteSubmit}>
                        Update offer
                    </Button> */}
                </Form>
            </div >
        );
    }
    else if (userToken && specificOffer && (userToken.uid === specificOffer.data.author_id)) {
        return (
            <div className="create-offer-container" >
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicSurame">
                        <Form.Label>Offer Number: <b>{specificOffer.data.id}</b></Form.Label>
                        <hr></hr>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" name="product" placeholder="Enter Product" defaultValue={specificOffer.data.product} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicSurame">
                        <Form.Label>Client</Form.Label>
                        <Form.Control type="text" name="client" placeholder="Enter Client" defaultValue={specificOffer.data.client} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Dimensions L x W x H mm</Form.Label>
                        <Form.Control type="number" name="size" placeholder="Enter Dimensions" defaultValue={specificOffer.data.size} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" name="quantity" placeholder="Enter Quantity" defaultValue={specificOffer.data.quantity} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Types</Form.Label>
                        <Form.Control type="number" name="types" placeholder="Enter Types" defaultValue={specificOffer.data.types} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Print</Form.Label>
                        <Form.Control type="text" name="print" placeholder="Enter Print" defaultValue={specificOffer.data.print} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Finishing</Form.Label>
                        <Form.Control type="text" name="finishing" placeholder="Enter Finishing" defaultValue={specificOffer.data.finishing} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>External</Form.Label>
                        <Form.Control type="text" name="external" placeholder="Enter External" defaultValue={specificOffer.data.external} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control type="text" name="notes" placeholder="Enter Notes" defaultValue={specificOffer.data.notes} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit Changes
                    </Button>
                </Form>
            </div >
        );
    } else if (!specificOffer) {
        return <div>Pending...</div>
    }
}
export default OfferReview;