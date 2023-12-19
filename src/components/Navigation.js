import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import { userSignOut } from '../services/authService';
import { Link } from 'react-router-dom';


const Navigation = function () {

    const { userToken, userProfileInfo } = useContext(AuthContext)

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>ERM Console</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        {userToken && userProfileInfo && (
                            <div className="navigation-menu">
                                <Link to="/main">Dashboard</Link>
                                <Link to="/offers">Offers</Link>
                                <Link to="/create-offer" >Create Offer</Link>
                                <Link onClick={userSignOut}>Sign out</Link>
                            </div>
                        )}
                        {!userToken && (
                            <div id="navigation-menu">

                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {userToken && (
                        <Navbar.Text>
                            Signed in as: <b>{`${userProfileInfo.name} ${userProfileInfo.surname}`}</b> Role: <b>{userProfileInfo.role}</b>
                        </Navbar.Text>
                    )}
                </Navbar.Collapse>
            </Container >
        </Navbar >
    );
};

export default Navigation;