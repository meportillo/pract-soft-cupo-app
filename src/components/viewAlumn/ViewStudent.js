import React, { useEffect, useState } from 'react';
import { getStudents } from '../../services/AlumnService';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';    
import Col from 'react-bootstrap/Col'; 
import "../../styles/ViewAlumn.css"
import { Button } from 'react-bootstrap';

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
        <Container>
            <div className="mb-8"></div>
            <Row className="justify-content-md-center">
            <Col className="col-md-10" >

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
                        <td>Acciones</td>
                        <td>Estado</td>
                    </tr>

                    {
                        cuposPedidos.map(mat => {
                            return(
                            <tr key={mat.nombre}>
                                <td>{mat.nombre}</td>
                                <td>{mat.comision.codComision}</td>
                                <td>{mat.comision.horaInicio}-{mat.comision.horaFin}</td>
                                <td>
                                    <Button variant="primary">Aceptar</Button>
                                    
                                    <Button variant="danger">Rechazar</Button>
                                </td>
                                <td>Pendiente</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
        </div>
        </Col>
        </Row>
        </Container>
      );
    };