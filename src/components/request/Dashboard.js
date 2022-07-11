import { useEffect, useState } from "react";
import { CardContainer, Form, Row } from "react-bootstrap";
import { getAlumnosSolicFiltro, getCuatrimestreByanio } from "../../services/SubjectService";

export default function Dashoard(){
    const [cuatrimestre, setCuatrimestre] = useState({});
    const [alumnosProcesados, setAlumnosProcesados] = useState(0);
    const [alumnosTotal, setAlumnosTotal] = useState(0);
    const [alumnosSinProcesar, setAlumnosSinProcesar] = useState(0);


    useEffect(()=>{
        getCuatrimestreByanio('2022','S1')
        .then(response=>{
            setCuatrimestre(response.data);
        })
        .catch(error=>{
        });
        getAlumnosSolicFiltro('NO_FILTRAR')
        .then(response=>{
            setAlumnosTotal(response.data.length);
        })
        .catch(error=>{
        });

        getAlumnosSolicFiltro('SIN_PROCESAR')
        .then(response=>{
            setAlumnosSinProcesar(response.data.length);
            setAlumnosProcesados(alumnosTotal - alumnosSinProcesar)
        })
        .catch(error=>{
        });
    },[])
        
    return(<>
        <Form.Label className="d-flex justify-content-center"><h3>Dashboard General de Solicitudes</h3></Form.Label>
        <Container>
            <Row>
            <hr></hr>
            <Card>
                <Card.Header> {cuatrimestre.semestre == 'S1' ? 'Primer': 'Segundo'} Cuatrimestre - { cuatrimestre.anio }</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        Inicio de Incripciones: {new Date(cuatrimestre.inicioInscripciones).toLocaleString().split(",")[0] }
                        <br></br>
                        Fin de Inscripciones: {new Date(cuatrimestre.finInscripciones).toLocaleString().split(",")[0]}{' '}
                    </p>
               { /*    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
    </footer>*/}
                    </blockquote>
                </Card.Body>
            </Card>
            <br></br>
            <hr></hr>
            <Card class="col-md-8">
                <Card.Header> Procesamiento Totales por Alumno</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        Cantidad Total de Alumnos con Solicitudes: {alumnosTotal}
                        <br></br>
                        Cantidad Total de Alumnos con Solicitudes Procesadas: {alumnosTotal - alumnosSinProcesar}
                        <br></br>
                        Cantidad Total de Alumnos con Solicitudes Pendientes: {alumnosSinProcesar}

                    </p>
               { /*    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
    </footer>*/}
                    </blockquote>
                </Card.Body>
            </Card>            
            </Row>            
        </Container>
    </>)
}