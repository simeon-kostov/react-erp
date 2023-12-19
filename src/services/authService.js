import { auth, db, secondaryApp } from '../firebase-config';
import {
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";


export const register = async (values) => {
    // Register and Auto-login New User & Create Firestore Users' Collection DB Entry
    await secondaryApp.auth().createUserWithEmailAndPassword(values.email, values.password).then(userToken => {
        console.log("User " + userToken.uid + " created successfully!");
        return db.collection('users').doc(userToken.user.uid).set({
            name: values.name,
            surname: values.surname,
            email: values.email,
            tel: values.tel,
            role: values.role
        })
    }).then(() => {
        secondaryApp.auth().signOut();
        // Modal Message !

    })

};


export const login = (values) => {
    // Login user
    signInWithEmailAndPassword(auth, values.email, values.password)
        .catch(
            (error) => {
                console.log(error)
            }
        );
}

export const userSignOut = async () => {
    await signOut(auth).then(() => {
        console.log("User successfully signed out!")

    }).catch(error => console.log(error))
    return
}