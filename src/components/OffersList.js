import Table from 'react-bootstrap/Table';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase-config';
import { render } from 'react-dom';


const OfferList = () => {

    const { userProfileInfo } = useContext(AuthContext)

    const [offersList, setOffersList] = useState([])

    useEffect(() => {
        aqcuireOffres();
    }, [])

    async function aqcuireOffres(offersListInDB) {
        try {
            await db.collection('offers').get().then(offersInDB => {
                const offersListInDB = []
                offersInDB.forEach(offerInDB => {
                    const offer = {
                        id: '',
                        product: '',
                        client: '',
                        quantity: '',
                        types: '',
                        print: '',
                        finishing: '',
                        external: '',
                        notes: '',
                    }
                    for (const [key, value] of Object.entries(offerInDB.data().values)) {
                        offer[key] = value
                    }
                    offersListInDB.push(offer)

                })
                setOffersList(offersListInDB)
            })
        } catch (error) {
            console.log(error)
        }
    }


    if (offersList.length >= 1) {
        return (
            <div className="tableContainer">
                < Table striped bordered hover >
                    < thead >
                        < tr >
                            {(userProfileInfo.role === "tecnical" || userProfileInfo.role === "administrator")
                                && offersList && Object.keys(offersList[0]).map(offerListKey => (

                                    <th>{offerListKey}</th>

                                ))
                            }
                        </tr>
                    </thead >

                    < tbody >
                        {(userProfileInfo.role === "tecnical" || userProfileInfo.role === "administrator")
                            && offersList && offersList.map(offer => (
                                <tr>
                                    {Object.values(offer).map(value => (
                                        <td>{value}</td>
                                    ))}
                                </tr>
                            )
                            )}
                    </tbody >
                </Table >
            </div >
        )
    } else {
        return (
            <div>Pending</div>
        );
    }
}



export default OfferList;