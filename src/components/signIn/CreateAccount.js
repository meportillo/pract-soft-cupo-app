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
    const [password,setPassword] = useState("");
    const [passwordConfirm,setPasswordConfirm] = useState("");
    const [dni,setDni] = useState("");
    const [error,setError] = useState(false);
    const navigate = useNavigate();


    const handleSubmitCreateUser = () => {
        if ( dni == "" || password.trim() == "" || passwordConfirm.trim() == "" ) {
            setError("Faltan datos por completar")
        }else{
            if(password.trim() != passwordConfirm.trim()){
                setError("La contraseña no coincide")
            }
            else{
                createUser(dni,password,passwordConfirm)
                .then(res => {
                    navigate(`/cuenta/codigo/${res}`);
                })
                .catch(err => {
                    setError(err.message);
                })
            }
        }
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleChangePasswordConfirm = (event) => {
        setPasswordConfirm(event.target.value);
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
                    <Form.Label>DNI</Form.Label>
                    <Form.Control placeholder="Introduzca un DNI" onChange={(e) => handleChangeDNI(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e) => handleChangePassword(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onChange={(e) => handleChangePasswordConfirm(e)} />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={handleSubmitCreateUser} style={{width: '50%'}}>
                        Crear 
                    </Button>
                </div>
            </Form>
            </Col>
            </Row>
        </Container>
    );
}