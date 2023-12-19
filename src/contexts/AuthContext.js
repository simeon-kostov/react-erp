import { createContext, useState } from 'react';
import { auth, db } from '../firebase-config';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {

    const initialState = {
        name: '',
        surname: '',
        email: '',
        tel: '',
        password: '',
        role: ''
    }

    const navigate = useNavigate()
    const [userToken, setCurrentUser] = useState('')
    const [userProfileInfo, setUserProfileInfo] = useState(initialState);
    const [fireAuthCheck, setFireAuthCheck] = useState(true);


    // Monitor Auth State
    useEffect(() => {
        if (fireAuthCheck) {

            auth.onAuthStateChanged(function (userToken) {

                if (userToken) {
                    console.log(`User with email ${userToken.email} logged in successfully!`)
                    setCurrentUser(userToken)
                    acquireUserProfile(userToken)
                } else {
                    setCurrentUser(userToken)
                    setUserProfileInfo({
                        name: '',
                        surname: '',
                        email: '',
                        tel: '',
                        password: '',
                        role: ''
                    })
                    navigate('/')
                    console.log("No user signed in!")
                }
            })
            setFireAuthCheck(false)
        }
    }, []);



    async function acquireUserProfile(userToken) {
        if (userToken) {
            await db.collection('users').doc(userToken._delegate.uid).get().then(user => {
                const userDataInDB = user.data()
                const currentUserProfile = initialState
                for (const [key, value] of Object.entries(userDataInDB)) {
                    currentUserProfile[key] = value
                }
                setUserProfileInfo(currentUserProfile)
            });
            console.log('Profile Acquired')
        } else {
            console.log('No Profile Info Available')
        }
    }


    const contextValues = {
        userToken,
        userProfileInfo,
    }

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    )

}
