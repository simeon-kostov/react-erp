import { db } from "../firebase-config"


export const createOffer = (values) => {
    db.collection('offers').add({
        values
    }).then(() => { })
}

// export const acquireOffers = async (offersList) => {

//     await db.collection('offers').get().then(offersInDB => {
//         offersInDB.forEach(offerInDB => {
//             const offer = {
//                 id: '',
//                 product: '',
//                 client: '',
//                 quantity: '',
//                 types: '',
//                 print: '',
//                 finishing: '',
//                 external: '',
//                 notes: '',
//             }
//             for (const [key, value] of Object.entries(offerInDB.data().values)) {
//                 offer[key] = value
//             }
//             offersList.push(offer)
//         })
//     })
//     return (
//         offersList
//     );
// }
