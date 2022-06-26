import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import { updateTimeFormulario } from '../../services/SubjectService';

export const ConfigurationDate = () => {
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [time, setTime] = useState("00:00");
    console.log("DATE Start", dateStart);
    console.log("DATE End", dateEnd);
    console.log("TIME", time);

    const updateTime = () => {
        updateTimeFormulario(dateStart,dateEnd,time)
    }

    return (
        <>
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
        </>
    )
}
