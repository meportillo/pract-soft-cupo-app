import { useState, useNavit } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";


export default function TableRequests(props){
    const navigate = useNavigate();
     return(<>
        <Table>
            <thead>
                <tr key={Math.random()}>
                    <th>Dni</th>
                    <th>Legajo</th>
                    <th>Materia</th>
                    <th>Cuatrimestre</th>
                    <th>Año</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>                
            <tbody>
                {props.requests.map(request => 
                    <tr key={Math.random()}>
                        <td>{request.dni}</td>
                        <td>{request.legajo}</td>
                        <td>{request.materia}</td>
                        <td>{request.quarter}</td>
                        <td>{request.year}</td>
                        <td>{request.state}</td>
                        <td>
                            <ButtonGroup>
                                <Button key={Math.random()} onClick={ e => navigate('student')}>
                                    Ver Detalle
                                </Button>
                            </ButtonGroup>  
                            </td>
                    </tr>)}
            </tbody>                
        </Table>
    </>)
}