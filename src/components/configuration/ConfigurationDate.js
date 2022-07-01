import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import { updateTimeFormulario } from '../../services/SubjectService';
import { AlertRequest } from '../request/AlertRequest';
import Accordion from 'react-bootstrap/Accordion';


export const ConfigurationDate = () => {
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [time, setTime] = useState("00:00");
    const [message,setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);

    console.log("DATE Start", dateStart);
    console.log("DATE End", dateEnd);
    console.log("TIME", time);

    const updateTime = () => {
        updateTimeFormulario(dateStart,dateEnd,time)
        .then(response=>{
            if(response.status == 200 || response.status == 201 || response.status == 204){
                //alert("Fomulario cerrado Ok")
                setMessage('Modificacion Exitosa!');
                setShowMessage(true);
                setCallError(false);
            }else{
                setMessage(response.response.data.error+ ": " + response.response.data.message );
                setShowMessage(true);
                setCallError(true);
            }
        }).catch(error=>{
            console.log(error);
            
            setMessage(error.code+" : "+((error.response.data[0] !== undefined)? error.response.data[0].message : error.response.data.message));
            setShowMessage(true);
            setCallError(true);
        })
    }

    return (
        <>

        {
            showMessage?
                <><AlertRequest message={message} click={()=>{setShowMessage(false)}} show={showMessage} error={callError}></AlertRequest></>
            :
                <></>
        }

            <Container>
                <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">        
                        <Accordion.Header>Inscripciones Inicio - Cierre</Accordion.Header>
                        <Accordion.Body>                    
                        <Form>
                            <Form.Group className="mb-3" controlId="formInicio">
                            <Form.Label>Fecha inicio</Form.Label>
                            <Form.Control
                                    type="date"
                                    name="duedate"
                                    placeholder="Due date"
                                    value={dateStart}
                                    onChange={(e) => setDateStart(e.target.value)}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEnd">
                            <Form.Label>Fecha fin</Form.Label>
                            <Form.Control
                                    type="date"
                                    name="duedate"
                                    placeholder="Due date"
                                    value={dateEnd}
                                    onChange={(e) => setDateEnd(e.target.value)}
                            />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="date">
                            <Form.Label>Horario</Form.Label>
                            <Form.Control
                                    type="time"
                                    className="start-time"
                                    name="busi_start_time"
                                    value={time}
                                    onChange={(e) => {
                                    setTime(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Button onClick={updateTime}  variant="primary">Enviar</Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
        </>
    )
}
