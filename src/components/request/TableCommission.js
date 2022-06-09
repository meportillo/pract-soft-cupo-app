import { useState, useNavit, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from "react-router-dom";
import { getComissions } from '../../services/AlumnService';


export default function TableCommission(props){
    const [requests, setRequests] = useState([]);
    let { idMateria } = useParams();

    useEffect(()=>{
        getComissions(idMateria, setRequests);
    },[])

    const navigate = useNavigate();
     return(
     <div className="container">
        <br></br>
        <h3>Lista de comisiones</h3>
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
                {requests.map(({cuposTotales,sobreCuposTotales,cuposDisponibles,numero,horarios,materia,id}) => 
                    <tr key={Math.random()}>
                        <td>{numero}</td>
                        <td>{materia}</td>
                        <td>{cuposTotales}</td>
                        <td>{cuposDisponibles}</td>
                        <td>
                            <ButtonGroup>
                                <Button key={Math.random()} onClick={ e => navigate('/commissionRequest/' + numero)}>
                                    Ver Detalle
                                </Button>
                            </ButtonGroup>  
                        </td>
                    </tr>)
                }
            </tbody>                
        </Table>
    </div>)
}