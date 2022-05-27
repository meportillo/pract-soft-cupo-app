import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {getCommissions, getSubjects2} from '../../services/SubjectService';


export default function CreateRequestShort(props){
    console.log(props);
    const [subjects, setSubjects] = useState([]);

    useEffect(()=>{
        getSubjects2(setSubjects);
    },[])
return(<>
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Solicitudes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    {subjects.map(subject=>{
                        console.log(subject);
                        return(
                        <Row>
                            <Col xs={4} md={8}>
                                {subject.nombre}
                            </Col>
                            <Col xs={4} md={4}>
                            </Col>                            
                        </Row>) 

                    })}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>);

}