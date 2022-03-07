import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import temp_storage from '../data_access_layer/temp_storage';

const Register = (props) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    let onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    let onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    let onSubmitHandler = (e) => {
        e.preventDefault();
        let found = temp_storage.customers.find(c => (c.email === email) && (c.password === password));
        if(found) {
            props.isLoggedIn(email);
            navigate('/');
        } else {
            alert('Invalid credentials')
        }
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onEmailChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Sign in
            </Button>
        </Form>
    );
}

export default Register;