import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import { updateTimeFormulario } from '../../services/SubjectService';

export const Configurations = () => {
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [time, setTime] = useState("00:00");
    console.log("DATE", date);
    console.log("TIME", time);

    const updateTime = () => {
        updateTimeFormulario(date,date2,time)
    }

    return (
        <>
            <Container >
                <h1> Menu de administracion del sitio</h1>
                <Row>
                    <Col>
                        Administrar fecha de inicio y cierre de solicitudes
                    </Col>
                    <Col xs={7}>  
                        <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        />
                    </Col>
                    <Col xs={7}>  
                        <Form.Control
                        type="date"
                        name="duedate"
                        placeholder="Due date"
                        value={date2}
                        onChange={(e) => setDate2(e.target.value)}
                        />
                    </Col>
                    <Col>
                    <input
                        type="time"
                        className="start-time"
                        name="busi_start_time"
                        value={time}
                        onChange={(e) => {
                        setTime(e.target.value);
                        }}
                    />
                    </Col>
                    <Button onClick={updateTime}  variant="primary">Enviar</Button>
                </Row>
            </Container>
        </>
    )
}
