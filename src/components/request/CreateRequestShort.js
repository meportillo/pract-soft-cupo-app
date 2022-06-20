import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {getCommisionsBySubject, getSubjects2, postCreateRequest} from '../../services/SubjectService';
import Form from 'react-bootstrap/Form';
import CommisionRequestShort from './CommisionRequestShort';
import { FiEye } from "react-icons/fi";

export default function CreateRequestShort(props){
    const [dni,setDni]  = useState(props.studentid);
    const [subjects, setSubjects] = useState([]);
    const [subjectsFilter, setSubjectsFilter] = useState([]);
    const [showComision, setShowComision] = useState(false);
    const [code, setCode] = useState('');
    const [commissions, setCommissions] = useState([]);

    useEffect(()=>{
        getSubjects2().then((data)=>{
            setSubjects(data)
            setSubjectsFilter(subjects);
            });
    },[])

    const click_ok = ()=>{

        if(code != ''){
            getCommisionsBySubject(code)
            .then((data)=>{
                setCommissions(data);
            });
            setCode('');
        }
    };
    useEffect(()=>{
        click_ok();
    },[showComision,commissions]);

    const createRequest = (dni,idCom)=>{
        postCreateRequest(dni,[idCom]).then(data =>{

        });
    }

return(<>
        <Modal {...props}  size="lg" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-getSubjects2vcenter">
                    Agregar Solicitudes
                </Modal.Title>
                <Form.Control
                    type="text"
                    id="search"
                    aria-describedby="passwordHelpBlock"
                    onChange={(e) => {
                        setSubjectsFilter(subjects.filter((subject)=>{return subject.nombre.toLocaleUpperCase().includes(e.target.value.toLocaleUpperCase())}))                        
                    }
            }
                />
            </Modal.Header>
            <Modal.Body className="show-grid">
                { (showComision)?
                    (commissions.length ===0)? <>No hay comisiones para la materia  <Button key={Math.random()} onClick={(e) => {
                        setShowComision(false)
                        //setCommissions([])
                        }}>ok</Button></>:
                     <>{commissions.map((com)=>{
                         return <CommisionRequestShort key={Math.random()} commission={com} createRequest={createRequest} dni={dni}/>}
                    )}
                         <Button  key={Math.random()} onClick={(e) => {
                             setCommissions([])
                             setShowComision(false)
                             }}>ok</Button>
                </>
                    :
                    <></>
                }
                <hr></hr>
                <Container>
                    {subjectsFilter.map(subject=>{
                        return(
                        <Row key={Math.random()}>
                            <Col xs={4} md={8}>
                                {subject.nombre}
                            </Col>
                            <Col xs={4} md={4}>
                                <Button variant='secondary' onClick={e=>{
                                        setCommissions([])
                                        setCode(subject.codigo)
                                        setShowComision(true)
                                    }
                                }><FiEye></FiEye></Button>
                            </Col>                            
                        </Row>) 

                    })}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    </>);

}