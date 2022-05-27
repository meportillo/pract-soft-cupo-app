import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";


export default function TableCupos({cupos}){

    function horarioToString(horarios){
        return horarios.map(({dia,inicio,fin}) => {
            return `${dia} ${inicio}-${fin}||`
        })
    }

    return (
        <>
        <h2>Cupos Pedidos</h2>
        <Table striped bordered hover className='Cupos'>
            <tbody>
                <tr>
                    <td>Materia</td>
                    <td>Comision</td>
                    <td>Modalidad</td>
                    <td>Horario</td>
                    <td>Estado</td>
                    <td>Acciones</td>
                </tr>
                {
                    cupos.map(({id,estado,comision:{materia,modalidad,horarios,id:idComision}}) => {
                        return(
                        <tr key={id}>
                            <td>{materia}</td>
                            <td>{idComision}</td>
                            <td>{modalidad}</td>
                            <td>{horarioToString(horarios)}</td>
                            <td>{estado}</td>
                            <td>
                            <Row className="mx-0">
                                <ButtonGroup>
                                <OverlayTrigger
                                    key="accept-id"
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-accept`}>
                                            Aprobar solicitud
                                        </Tooltip>
                                    }
                                    >
                                    <Button variant="primary">
                                        <FiCheck></FiCheck>
                                    </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                    key="accept-id"
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-accept`}>
                                            Rechazar solicitud
                                        </Tooltip>
                                    }
                                    >
                                    <Button variant="danger">
                                        <FiX></FiX>
                                    </Button>
                                    </OverlayTrigger>
                                </ButtonGroup>
                            </Row>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
        </>
    )
}