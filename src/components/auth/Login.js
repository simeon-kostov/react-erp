
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { login } from '../../services/authService';


const Login = function () {

    const initialState = {
        email: '',
        password: '',
    }

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(values)
        setValues(initialState)
    };

    return (
        <div className="Login-container" >
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={values.email}
                        onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;