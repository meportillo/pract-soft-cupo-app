import React, { useEffect, useState } from "react";
import { getRequestsOfStudent } from '../../services/StudentService';
import Table from 'react-bootstrap/Table';
import { getUser } from "../../utils/auth";
import Form from 'react-bootstrap/Form';

export function HomeStudent() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(()=>{
        const user = getUser();
        getRequestsOfStudent(user)
        .then(data => {
            const mapSolicitudes = data.solicitudes.map(sol => {return {comision:sol.comision.id,estado:sol.estado,materia:sol.comision.materia,modalidad:sol.comision.modalidad,horarios:sol.comision.horarios.map(hor => `${hor.dia} ${hor.inicio}-${hor.fin}`).join()}})
            setSolicitudes(mapSolicitudes)
        })
        .catch(err => {
        })
    },[])

    return(
        <Form className="container">
            <h1 className="d-flex justify-content-center mb-3">Formulario Cargado</h1>
            {
                solicitudes.length === 0
                    ? <div>No hay Solicitudes cargadas</div>
                    : <Form.Group className="row"><TableRequestsStudent solicitudes={solicitudes}/></Form.Group>
            }
        </Form>
    )
};

const TableRequestsStudent = (props) => {
    return (
        <Table size="sm">
        <thead>
            <tr>
            <th>Estado</th>
            <th>Materia</th>
            <th>Modalidad</th>
            <th>Horarios</th>
            <th>Comision</th>
            </tr>
        </thead>
        <tbody>
            {
                props.solicitudes.map((sol,index) => {
                    return (
                            <tr key={index}>
                            <td>{sol.estado}</td>
                            <td>{sol.materia}</td>
                            <td>{sol.modalidad}</td>
                            <td>{sol.horarios}</td>
                            <td>{`C${sol.comision}`}</td>
                            </tr>
                        )
                })
            }
        </tbody>
        </Table>
    )
}