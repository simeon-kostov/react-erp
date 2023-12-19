import Table from 'react-bootstrap/Table';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { OfferContext } from '../../contexts/OfferContext';
import { useNavigate } from 'react-router-dom';



const OfferList = () => {

    const { getSpecificOffer, userProfileInfo } = useContext(AuthContext)
    const { offersList } = useContext(OfferContext)

    const navigate = useNavigate()


    const handleClick = (e) => {
        navigate(`/offers/${e.target.parentElement.id}`)
    }


    const tableTitles = {
        id: 'No #',
        product: 'Product',
        size: 'Dimensions',
        quantity: 'Quantity',
        types: 'Types',
        print: 'Print',
        finishing: 'Finishing'
    }



    if (offersList.length >= 1) {
        return (
            <div className="tableContainer">

                < Table striped bordered hover >
                    < thead >
                        < tr>
                            {(userProfileInfo.role === "technical" || userProfileInfo.role === "administrator")
                                && Object.values(tableTitles).map((value, index) => (
                                    < th key={index}>
                                        {value}
                                    </th>
                                ))}
                        </tr>
                    </thead >

                    < tbody >
                        {(userProfileInfo.role === "technical" || userProfileInfo.role === "administrator")
                            && offersList
                            && offersList.map((offer) => (
                                <tr key={tableTitles.length + offer.data.id} id={offer.uid}>
                                    {Object.keys(tableTitles).map((columnKey, index) => (
                                        < td key={`${offer.data.id + index}`} onClick={handleClick}>
                                            {offer.data[columnKey]}
                                        </td>
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