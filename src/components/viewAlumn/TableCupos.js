import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import { Button, ButtonGroup } from 'react-bootstrap';

export default function TableCupos({cupos}){
    return (
        <>
        <h2>Cupos Pedidos</h2>
        <Table striped bordered hover className='Cupos'>
            <tbody>
                <tr>
                    <td>Comision</td>
                    <td>Estado</td>
                    <td>Acciones</td>
                </tr>
                {
                    cupos.map(cupo => {
                        return(
                        <tr key={cupo.id}>
                            <td>{cupo.comisionId}</td>
                            <td>{cupo.estado}</td>
                            <td>
                            <ButtonGroup className="col">
                                <Button variant="primary">Aceptar</Button>
                                <Button variant="danger">Rechazar</Button>
                            </ButtonGroup>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
        </>
    )
}