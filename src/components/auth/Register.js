import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';

import { register } from '../../services/authService';

const Register = function () {

    const initialState = {
        name: '',
        surname: '',
        email: '',
        tel: '',
        password: '',
        role: 'default'
    }

    const [values, setValues] = useState({
        name: '',
        surname: '',
        email: '',
        tel: '',
        password: '',
        role: 'default'
    });

    const handleChange = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(values);
        setValues({ ...initialState });
    }

    return (
        <div>
            <div className="Login-container" >
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter name" value={values.name} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicSurame">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" name="surname" placeholder="Enter surname" value={values.surname} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTel">
                        <Form.Label>Telephone</Form.Label>
                        <Form.Control type="tel" name="tel" placeholder="Enter Phone" value={values.tel} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Assign role</Form.Label>
                        <Form.Select aria-label="Default select example" name="role" value={values.role} onChange={handleChange}>
                            <option value="default" disabled={true}>Select role</option>
                            <option value="administrator" disabled={true}>Administrator</option>
                            <option value="marketing">Marketing</option>
                            <option value="technical">Technical</option>
                            <option value="production">Production</option>
                            <option value="spedition">Spedition</option>
                            <option value="accounting">Accounting</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Create new user
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Register;