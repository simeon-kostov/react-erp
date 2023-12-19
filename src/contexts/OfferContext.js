import { createContext, useState } from 'react';
import { auth, db } from '../firebase-config';
import { useEffect } from 'react';

export const OfferContext = createContext();

export const OfferProvider = ({
    children,
}) => {

    const [offersList, setOffersList] = useState([])
    const [maxOfferId, setMaxOfferId] = useState('')
    const [specificOffer, setSpecificOffer] = useState({})

    useEffect(() => {
        aquireAllOffers()
    }, [])

    const aquireAllOffers = async () => {
        setOffersList([])
        db.collection('offers').onSnapshot(offersInDB => {
            const offersListInDB = []
            offersInDB.forEach(offerInDB => {
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
                offersListInDB.push(offer)
            })
            setOffersList(offersListInDB)
        })
    }


    // Max Offer ID in Collection (Listen with onSnapshot)
    auth.onAuthStateChanged(() => {
        db.collection('offers').onSnapshot(offersInDB => {
            const offerIds = [0]
            offersInDB.forEach(offerInDB => {
                offerIds.push(offerInDB.data().values.id)
            })
            setMaxOfferId(Math.max(...offerIds))
        })
    })

    const contextValues = {
        maxOfferId,
        offersList
    }

    return (
        <>
            <OfferContext.Provider value={contextValues}>
                {children}
            </OfferContext.Provider>
        </>
    )

}
