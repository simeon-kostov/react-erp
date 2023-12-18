import { onAuthStateChanged } from 'firebase/auth';
import Login from './auth/Login';
import { auth } from '../firebase-config';

const Frontpage = function () {

    return (

        < div >
            <Login />
        </div >
    );
};

export default Frontpage;