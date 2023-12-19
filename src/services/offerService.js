import { db } from "../firebase-config"


export const createOffer = async (values) => {
    await db.collection('offers').add({ values })
        .then(() => { console.log('Offer Created Successfully!') })
        .catch(error => {
            console.log(error)
        });
}


