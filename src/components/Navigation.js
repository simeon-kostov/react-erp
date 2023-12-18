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

                        {userToken && (
                            <div className="navigationMenu">
                                <Nav.Link><Link to="/main">Dashboard</Link></Nav.Link>
                                <Nav.Link><Link to="/offers">Offers</Link></Nav.Link>
                                <Nav.Link><Link to="/create-offer">Create Offer</Link></Nav.Link>
                                <Nav.Link><Link onClick={userSignOut}>Sign out</Link></Nav.Link>
                            </div>
                        )}
                        {!userToken && (
                            <div id="navigationMenu">

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