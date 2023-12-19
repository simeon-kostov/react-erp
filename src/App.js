import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Frontpage from './components/Frontpage';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import CreateOffer from './components/offers/CreateOffer';


import { RouteGuard } from './common/RouteGuard';
import OffersList from './components/offers/OffersList';
import { OfferProvider } from './contexts/OfferContext';
import OfferReview from './components/offers/OfferReview';


function App() {


    return (
        <AuthProvider>
            <OfferProvider>
                <div className="App">
                    <Navigation />
                    <div>
                        <Routes>
                            <Route element={<RouteGuard />}>
                                <Route path="/main" element={<Dashboard />} />
                                <Route path="/create-offer" element={<CreateOffer />} />
                                <Route path="/offers" element={<OffersList />} />
                                <Route path='/offers/:offerId' element={<OfferReview />} />
                            </Route>
                            <Route path="/" element={<Frontpage />} />
                        </Routes>
                    </div>
                </div>
            </OfferProvider>
        </AuthProvider>
    );
}

export default App;
