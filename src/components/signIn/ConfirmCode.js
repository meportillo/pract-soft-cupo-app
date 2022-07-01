import React, { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';   
import Alert from 'react-bootstrap/Alert';    
import { sendCode } from '../../services/StudentService';
import { setToken } from '../../utils/auth';
import { useNavigate } from "react-router-dom";

export function ConfirmCode(props){
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const [code,setCode] = useState("");
    const [dni,setDni] = useState("");
    const [success,setSuccess] = useState(false);
    const handleChangeStateDNI = (event) => setDni(event.target.value)  
    const handleChangeStateCode = (event) => setCode(event.target.value)  

    const fieldCenter = (title,handleInput) => 
                            <div className="d-flex justify-content-center">
                                <InputGroup className="mb-3" style={{"width" : "500px"}} onChange={(e) => handleInput(e)}>
                                    <InputGroup.Text>{title}</InputGroup.Text>
                                    <FormControl
                                    placeholder={title}
                                    />
                                </InputGroup> 
                            </div>
    
    const handleSubmit = () => {
        if(code.trim() != "" && dni.trim() != ""){
            sendCode(code,dni)
            .then(token => {
                setSuccess("Se creo exitosamente la cuenta");
            })
            .catch(err => setError(err))
        }
        else{
            setError("Faltan datos por completar")
        }

    }
    return(
        <div className="container">
            <br></br>
            <br></br>
            <h1 className="d-flex justify-content-center mb-6">Ingrese Código de Confirmación </h1>
            {
                success ? <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                            {success}
                        </Alert>
                : <></>
            }
            {
                error ? <Alert variant="danger" onClose={() => setError(false)} dismissible>
                            {error}
                        </Alert>
                : <></>
            }
            <br></br>
            <br></br>
            {fieldCenter("DNI",handleChangeStateDNI)}
            {fieldCenter("Código",handleChangeStateCode)}
            <div className="d-flex justify-content-center mb-2">
                    <Button variant="primary" onClick={handleSubmit} style={{width: '20%'}}>
                        Enviar Código
                    </Button>
            </div>
            <div className="d-flex justify-content-center">
                    <Button variant="primary" style={{width: '20%'}} onClick={()=>navigate("/signIn")}>
                        Login
                    </Button>
            </div>
        </div>
    ) 
} 