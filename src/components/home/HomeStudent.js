import React, { useEffect, useState } from "react";
import { getRequestsOfStudent, deleteRequest } from '../../services/StudentService';
import Table from 'react-bootstrap/Table';
import { getUser } from "../../utils/auth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function HomeStudent() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [inscripciones, setInscripciones] = useState([]);

    const deleteForm = () => {
        deleteRequest()
        .then(res => {
            setSolicitudes([])
        })
        .catch(err => console.log(err))
    }
    useEffect(()=>{
        const user = getUser();
        getRequestsOfStudent(user)
        .then(data => {
            const mapSolicitudes = data.solicitudes.map(sol => {return {comision:sol.comision.numero,estado:sol.estado,materia:sol.comision.materia,modalidad:sol.comision.modalidad,horarios:sol.comision.horarios.map(hor => `${hor.dia} ${hor.inicio}-${hor.fin}`).join()}})
            const mapInscripciones = data.comisionesInscripto.map(com => ({materia:com.materia,comision:com.numero,horarios:com.horarios.map(hor => `${hor.dia} ${hor.inicio}-${hor.fin}`).join()})) 
            setInscripciones(mapInscripciones)
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
                    : <>
                      <Form.Group className="row"><TableRequestsStudent solicitudes={solicitudes} inscripciones={inscripciones}/></Form.Group>
                      <Button onClick={deleteForm} variant="danger">Borrar Formulario</Button>
                      </>
            }
        </Form>
    )
};

const TableRequestsStudent = (props) => {
    return (
        <>
        <h3>Cupos solicitados</h3>
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
        <h3>Materias inscriptas</h3>
        <Table size="sm">
        <thead>
            <tr>
            <th>Materia</th>
            <th>Horarios</th>
            <th>Comision</th>
            </tr>
        </thead>
        <tbody>
            {
                props.inscripciones.map((sol,index) => {
                    return (
                            <tr key={index}>
                            <td>{sol.materia}</td>
                            <td>{sol.horarios}</td>
                            <td>{`C${sol.comision}`}</td>
                            </tr>
                        )
                })
            }
        </tbody>
        </Table>
        </>
    )
}