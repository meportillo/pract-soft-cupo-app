import React, { useEffect, useState } from "react";
import { getRequestsOfStudent } from '../../services/AlumnService';
import { Navbar } from "../navigation/NavBar";
import Table from 'react-bootstrap/Table';
import { getUser } from "../../utils/auth";

export function HomeStudent() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(()=>{
        const user = getUser();
        getRequestsOfStudent(user)
        .then(data => {
            setSolicitudes(data.formulario.solicitudes)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return(
        <div>
        <div className="container">
            <h1 className="d-flex justify-content-center mb-3">Solicitudes</h1>
            {
                solicitudes.length === 0
                    ? <div>No hay Solicitudes cargadas</div>
                    : <TableRequestsStudent solicitudes={solicitudes}/>
            }
        </div>    
        </div>
    )
};

const TableRequestsStudent = (props) => {
    return (
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Comision</th>
            <th>Modalidad</th>
            <th>Materia</th>
            <th>Horarios</th>
            </tr>
        </thead>
        <tbody>
            {
                props.solicitudes.map((sol,index) => {
                    const horarios = sol.comision.horarios.map(c => `${c.dia} ${c.inicio}-${c.fin}`).join() 
                    return (
                            <tr key={index}>
                            <td>{sol.comision.numero}</td>
                            <td>{sol.comision.modalidad}</td>
                            <td>{sol.comision.materia}</td>
                            <td>{horarios}</td>
                            </tr>
                        )
                })
            }
        </tbody>
        </Table>
    )
}