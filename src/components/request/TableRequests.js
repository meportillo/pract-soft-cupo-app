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
       <h3>Materias Socilicitadas</h3>       
        <Table>
            <thead>
                <tr key={Math.random()}>
                    <th>Materia</th>
                    {/* <th>Cupos Totales</th> */}
                    <th>Cantidad Solicitudes</th>
                </tr>
            </thead>                
            <tbody>
                {props.requests.map(({nombre,cantidadSolicitudes,codigo}) => 
                    <tr key={Math.random()}>
                        <td>{nombre}</td>
                        {/* <td>{commission.sobrecuposTotales}</td> */}
                        <td>{cantidadSolicitudes}</td>
                        <td>
                            <ButtonGroup>
                                <Button key={Math.random()} onClick={ e => navigate('materiaRequest/'+codigo)}>
                                    Ver Detalle
                                </Button>
                            </ButtonGroup>  
                            </td>
                    </tr>)
                }
            </tbody>                
        </Table>
    </>)
}