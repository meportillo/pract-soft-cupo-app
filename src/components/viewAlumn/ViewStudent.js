import React, { useEffect, useState } from 'react';
import { getStudents } from '../../services/AlumnService';
import Table from 'react-bootstrap/Table'
import { Button, ButtonGroup } from 'react-bootstrap';

export  default function ViewStudent(props){

    const [materiasAprobadas, setMateriasAprobadas]= useState([])
    const [cuposPedidos, setCuposPedidos]= useState([])
    const [alumno,setAlumno] = useState({})

    useEffect(() => {
        getStudents
        .then(data => {
            setMateriasAprobadas(data.materiasAprobadas)
            setCuposPedidos(data.cuposPedidos)
            setAlumno({"nombre" : data.nombre,"apellido" : data.apellido ,"legajo": data.legajo})
        })
    },[])

    return (
        <>
            <div className='container'>
                <div>
                <h4>{alumno.nombre} {alumno.apellido}</h4>
                <h4>Legajo : {alumno.legajo}</h4>
                </div>

                <div className='Elementos'>
                    <h2>Materias Aprobadas</h2>
                    <Table striped bordered hover className='Aprobadas'>
                        <tbody>
                            <tr>
                                <td>Nombre</td>
                                <td>Nota</td>
                            </tr>

                            {
                                materiasAprobadas.map(mat => {
                                    return(
                                    <tr key={mat.nombre}>
                                        <td>{mat.nombre}</td>
                                        <td>{mat.nota}</td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                    <h2>Cupos Pedidos</h2>
                    <Table striped bordered hover className='Cupos'>
                        <tbody>
                            <tr>
                                <td>Nombre</td>
                                <td>Comision</td>
                                <td>Horario</td>
                                <td>Estado</td>
                                <td>Acciones</td>
                            </tr>

                            {
                                cuposPedidos.map(mat => {
                                    return(
                                    <tr key={mat.nombre}>
                                        <td>{mat.nombre}</td>
                                        <td>{mat.comision.codComision}</td>
                                        <td>{mat.comision.horaInicio}-{mat.comision.horaFin}</td>
                                        <td>Pendiente</td>
                                        <td>
                                        <ButtonGroup className="col">
                                            <Button variant="primary">Aceptar</Button>
                                            <Button variant="danger">Rechazar</Button>
                                        </ButtonGroup>
                                        </td>

                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>  
        </>
      );
    };