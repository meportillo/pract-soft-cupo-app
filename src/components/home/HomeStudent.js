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
            const mapSolicitudes = data.map(sol => {return sol.comisiones.map(com => {return {materia:sol.nombre,comision:com.comision,modalidad:com.modalidad,horarios:com.horarios.map(hor => `${hor.dia} ${hor.inicio}-${hor.fin}`).join()}})}).flat()
            setSolicitudes(mapSolicitudes)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return(
        <div>
        <div className="container">
            <h1 className="d-flex justify-content-center mb-3">Formulario Cargado</h1>
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
            <th>Materia</th>
            <th>Modalidad</th>
            <th>Comision</th>
            <th>Horarios</th>
            </tr>
        </thead>
        <tbody>
            {
                props.solicitudes.map((mat,index) => {
                    return (
                            <tr key={index}>
                            <td>{mat.materia}</td>
                            <td>{mat.modalidad}</td>
                            <td>{`C${mat.comision}`}</td>
                            <td>{mat.horarios}</td>
                            </tr>
                        )
                })
            }
        </tbody>
        </Table>
    )
}