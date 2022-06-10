import React, { useState, useEffect } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import {getRequestsByCommision} from '../../services/SubjectService';
import { useNavigate, useParams } from "react-router-dom";

export default function CommissionRequest(props){
    const [requests, setRequests] = useState([]);
    const [commissionId, setCommissionId] = useState(props.commission);
    const navigate = useNavigate();
    let { idcomision } = useParams();

    useEffect(()=>{
        getRequestsByCommision(idcomision, setRequests);
    },[])
    return (<>
        <Table className="container">
            <thead>
                <tr key={Math.random()}>
                    <th>Dni</th>
                    <th>Materias Aprobadas</th>
                    <th>Acciones</th>
                </tr>
            </thead>                
            <tbody>
                {requests.map(request => 
                    <tr key={Math.random()}>
                        <td>{request.dni}</td>
                        <td>{request.cantidadDeAprobadas}</td>
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
    </>);
}