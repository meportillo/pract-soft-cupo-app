import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';

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
                                <Button as={Col} variant="primary">Aceptar</Button>
                                <Button as={Col} variant="danger" className="mx-2">Rechazar</Button>
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