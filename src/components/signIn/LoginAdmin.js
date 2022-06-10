import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';   
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';    
import Col from 'react-bootstrap/Col';    
import Alert from 'react-bootstrap/Alert';    
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/AlumnService"
import { setToken } from '../../utils/auth';
export function LoginAdmin() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        loginAdmin(email.trim(),password.trim())
        .then(res => {
            setToken(res)
            navigate("/");
        })
        .catch(err => {
            setError(err.message);
        })
    }

    return (
        <Container>
            <div className="mb-5"></div>
            <Row className="justify-content-md-center">
            <Col className="col-md-6" >
            {
                error ? <Alert variant="danger" onClose={() => setError(false)} dismissible>
                            Correo Electronico o contraseña incorrectos
                        </Alert>
                : <></>
            }
            <div className="d-flex justify-content-center">   
                <FaSignInAlt className="mb-3" size={80}/>
            </div>
            <h3 className="d-flex justify-content-center mb-3">Login</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Correo Electronico</Form.Label>
                    <Form.Control type="email" placeholder="Introduzca un Correo" onChange={(e) => handleChangeEmail(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e) => handleChangePassword(e)} />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={handleSubmit} style={{width: '50%'}}>
                        Login
                    </Button>
                </div>
            </Form>
            </Col>
            </Row>
        </Container>
    );
}