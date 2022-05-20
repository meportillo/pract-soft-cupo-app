import { useState, useNavit } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";


export default function TableRequests(props){
    const navigate = useNavigate();
     return(<>
       <br></br>
       <br></br>       
        <Table>
            <thead>
                <tr key={Math.random()}>
                    <th>Comision</th>
                    <th>Materia</th>
                    <th>Cupos Totales</th>
                    <th>Cupos Disponibles</th>
                </tr>
            </thead>                
            <tbody>
                {props.requests.map(commission => 
                    <tr key={Math.random()}>
                        <td>{commission.comision}</td>
                        <td>{commission.materia}</td>
                        <td>{commission.sobrecuposTotales}</td>
                        <td>{commission.sobrecuposDisponibles}</td>
                        <td>
                            <ButtonGroup>
                                <Button key={Math.random()} onClick={ e => navigate('commissionRequest/'+commission.id)}>
                                    Ver Detalle
                                </Button>
                            </ButtonGroup>  
                            </td>
                    </tr>)}
            </tbody>                
        </Table>
    </>)
}