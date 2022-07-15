import React, { useEffect, useState } from "react";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getRequestsOfStudent, deleteRequest, getCuatrimestreActual } from '../../services/StudentService';
import Table from 'react-bootstrap/Table';
import { getUser } from "../../utils/auth";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CountDown from "../request/countDown/CountDown";
import { Alert } from "react-bootstrap";


export function HomeStudent() {
    const [cuatrimestre, setCuatrimestre] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [inscripciones, setInscripciones] = useState([]);
    const [error,setError] = useState(false);
    const deleteForm = () => {
        if (window.confirm("Estas seguro que deseas borrar este formulario")) {
            deleteRequest()
            .then(res => {
                setSolicitudes([])
                setInscripciones([])
            })
            .catch(res=>{
                setError(res.message)
            })
        }
    }
    
    useEffect(()=>{
        getCuatrimestreActual()
        .then(response=>{
            setCuatrimestre(response);
        })
        .catch();
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
            <Card>
            { 
                cuatrimestre ?
                    <>     
                    <Card.Header> {cuatrimestre.semestre == 'S1' ? 'Primer': 'Segundo'} Cuatrimestre - { cuatrimestre.anio }</Card.Header>
                    <Card.Body>
                        Tiempo restante para que finalice el proceso de inscripciones en Guarani:
                        <CountDown targetDate={new Date(cuatrimestre.finInscripciones).getTime()}/>
                        <blockquote className="blockquote mb-0">
                        <p>
                            <br></br>
                            Fin de Inscripciones: {new Date(cuatrimestre.finInscripciones).toLocaleString().split(",")[0]}{' '}
                        </p>
                        </blockquote>
                    </Card.Body></>
                :   <></>
                }
            </Card>
            <br></br>
            <Form.Group>
            {
                error ? <Alert  variant="danger" onClose={() => setError(false)} dismissible>
                            {error}
                        </Alert>
                : <></>
            }
            </Form.Group>
            <h3 className="d-flex justify-content-center mb-3">Formulario Cargado</h3>
            {
                solicitudes.length + inscripciones.length === 0
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
        <h4 style={{textAlign:"center"}}>Cupos solicitados</h4>
        {
            props.solicitudes.length > 0  ? 
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
            : <p>No hay cupos solicitados</p>

        }
        <h4 style={{textAlign:"center"}}>Materias inscriptas</h4>
        {
            props.inscripciones.length > 0  ? 
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
            :<p>No se declararon materias inscriptas</p>
        }
        </>
    )
}