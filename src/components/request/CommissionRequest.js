import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import {getRequestsByCommision} from '../../services/SubjectService';
import { useNavigate, useParams } from "react-router-dom";

export default function CommissionRequest(props){
    const [requests, setRequests] = useState([]);
    const [commissionId, setCommissionId] = useState(props.commission);
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(()=>{
        console.log("Materia con id "+ id);
        getRequestsByCommision(id, setRequests);
    },[])
    
    return (
    <div  className="container">
        <br></br>
        <h3>Lista de alumnos con solicitud</h3>
        <Table>
            <thead>
                <tr key={Math.random()}>
                    <th>Dni</th>
                    <th>Materias Aprobadas</th>
                    <th>Id Formulario</th>
                    <th>Ver en detalle</th>
                </tr>
            </thead>                
            <tbody>
                {requests.map(request => 
                    <tr key={Math.random()}>
                        <td>{request.dni}</td>
                        <td>{request.cantidadDeAprobadas}</td>
                        <td>{request.idFormulario}</td>
                        <td>
                            <ButtonGroup>
                                <Button key={Math.random()} onClick={ e => navigate('/student/'+request.dni)}>
                                    Ver Detalle
                                </Button>
                            </ButtonGroup>  
                            </td>
                    </tr>)}
                    </tbody>                
        </Table>
    </div >);
}