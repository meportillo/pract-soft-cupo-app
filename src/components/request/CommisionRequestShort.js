import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {getCommisionsBySubject} from '../../services/SubjectService';
import {FiSend} from  "react-icons/fi";

export default function CommisionRequestShort(props){

    const [commission, setcommission] = useState(props.commission);
    return(<>
            <Container>
                <Row>
                    <Col>
                        Numero: {commission.numero}
                    </Col>
                    <Col>
                        Cupos Disponibles: {commission.cuposDisponibles}
                    </Col>
                    <Col>
                    Horarios:
                        {commission.horarios.map(({dia,inicio,fin}) => {
                    return  <div>{dia}: {inicio}-{fin}</div> 
                    })}
                        <Button onClick={e => {props.createRequest(props.dni, commission.id)}}>
                            <FiSend></FiSend>
                        </Button>

                    </Col>
                </Row>
            </Container>
           </>);
}