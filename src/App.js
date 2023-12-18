import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes, useNavigate } from 'react-router-dom';



import { useState, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';

import Frontpage from './components/Frontpage';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import CreateOffer from './components/CreateOffer';

import { auth, db } from './firebase-config';

import { RouteGuard } from './common/RouteGuard';
import OffersList from './components/OffersList';


function App() {







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
                    console.log("No user signed in!")
                }

            })
        };
        setFireAuthCheck(false)
    }, [])



    const acquireUserProfile = (userToken) => {
        db.collection('users').doc(userToken._delegate.uid).get().then(user => {
            const userDataInDB = user.data()
            const currentUserProfile = initialState
            for (const [key, value] of Object.entries(userDataInDB)) {
                currentUserProfile[key] = value
            }
            setUserProfileInfo(currentUserProfile)
        });
    }




    const contextValues = {
        userToken,
        userProfileInfo,
    }

    return (
        <AuthContext.Provider value={contextValues}>
            <div className="App">
                <Navigation />
                <div>
                    <Routes>
                        <Route element={<RouteGuard />}>
                            <Route path="/main" element={<Dashboard />} />
                            <Route path="/create-offer" element={<CreateOffer />} />
                            <Route path="/offers" element={<OffersList />} />
                        </Route>
                        <Route path="/" element={<Frontpage />} />
                    </Routes>
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
