import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';   
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';    
import Col from 'react-bootstrap/Col';    
import Alert from 'react-bootstrap/Alert';    
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createUser } from '../../services/AlumnService';
export function CreateAccount() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [dni,setDni] = useState("");
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        const data = {
            email:email,
            dni:dni,
            username:username,
            password:password
        }
        createUser(data)
        .then(res => {
            localStorage.setItem("jwt",res.token)
            navigate("/")
            document.body.style = 'background: white;'
        })
        .catch(err => {
            setError(err.message);
        })
        // if ( dni == "" || email.trim() == "" || username.trim() == "" || password.trim() == "" ) {
        //     setError("Faltan datos por completar")
        // }
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangeDNI = (event) => {
        setDni(event.target.value)
    }
    return (
        <Container>
            <div className="mb-5"></div>
            <Row className="justify-content-md-center">
            <Col className="col-md-6" >
            {
                error ? <Alert variant="danger" onClose={() => setError(false)} dismissible>
                            {error}
                        </Alert>
                : <></>
            }
            <div className="d-flex justify-content-center">   
                <FaSignInAlt className="mb-3" size={80}/>
            </div>
            <h3 className="d-flex justify-content-center mb-3">Crear Cuenta</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Direccion de Correo Electronico</Form.Label>
                    <Form.Control type="email" placeholder="Introduzca un mail" onChange={(e) => handleChangeEmail(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre de Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Introduzca un nombre" onChange={(e) => handleChangeUsername(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>DNI de Alumno</Form.Label>
                    <Form.Control type="number" placeholder="Introduzca su DNI" onChange={(e) => handleChangeDNI(e)} />
                </Form.Group>                
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e) => handleChangePassword(e)} />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={handleSubmit} style={{width: '50%'}}>
                        Crear 
                    </Button>
                </div>
            </Form>
            </Col>
            </Row>
        </Container>
    );
}