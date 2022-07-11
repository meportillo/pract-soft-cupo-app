import { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Form, Row } from "react-bootstrap";
import { closeAllRequests, getAlumnosSolicFiltro, getCuatrimestreByanio } from "../../services/SubjectService";

import AnyChart from "anychart-react";
import anychart from "anychart";
import CountDown from "./countDown/CountDown";
import { AlertRequest } from "./AlertRequest";

export default function Dashoard(){
    const [cuatrimestre, setCuatrimestre] = useState({});
    const [alumnosProcesados, setAlumnosProcesados] = useState(undefined);
    const [alumnosSinProcesar, setAlumnosSinProcesar] = useState(undefined);
    const [message,setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);
    const dateTimeAfterThreeDays = new Date(cuatrimestre.finInscripciones).getTime();

    useEffect(()=>{
        getCuatrimestreByanio('2022','S1')
        .then(response=>{
            setCuatrimestre(response.data);
        })
        .catch(error=>{
            console.log(error);
        });
        getAlumnosSolicFiltro('FALTA_PROCESAR')
        .then(response=>{
            setAlumnosSinProcesar(response.data.length);
        })
        .catch(error=>{
            console.log(error);
        });
        getAlumnosSolicFiltro('PROCESADO')
        .then(response=>{
            setAlumnosProcesados(response.data.length);
        })
        .catch(error=>{
            console.log(error);
        });        
    },[])

    const closeAll = () => {
        if(window.confirm("Desea cerrar todos los formularios?")){
            closeAllRequests()
            .then(response => {
                if(response.status == 200){
                    //alert("Fomulario cerrado Ok")
                    setMessage('Solicitudes restantes rechazadas correctamente');
                    setShowMessage(true);
                    setCallError(false);
                }else{
                    setMessage(response.response.data.error+ ": " + response.response.data.message );
                    setShowMessage(true);
                    setCallError(true);
                }
            })
        }
     }
        
    return(<>
        <Form.Label className="d-flex justify-content-center"><h3>Dashboard General de Solicitudes</h3></Form.Label>
        <Container>
            <Row>
            <hr></hr>
            <Card>
                <Card.Header> {cuatrimestre.semestre == 'S1' ? 'Primer': 'Segundo'} Cuatrimestre - { cuatrimestre.anio }</Card.Header>
                <Card.Body>
                Tiempo restante para que finalice el proceso de inscripciones en Guarani:
                <CountDown targetDate={dateTimeAfterThreeDays} />
                    <blockquote className="blockquote mb-0">
                    <p>
                        <br></br>
                        Fin de Inscripciones: {new Date(cuatrimestre.finInscripciones).toLocaleString().split(",")[0]}{' '}
                    </p>
               { /*    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
    </footer>*/}
                    </blockquote>
                    <div>

                    </div>
                </Card.Body>
            </Card>
            <br></br>
            <hr></hr>
            <Card className="col-md-8">
            { alumnosProcesados == undefined && alumnosSinProcesar == undefined ? 
            <></>
            :
            <div style={{align: 'center'}}>
                <AnyChart
                id="pieChart"
                width={800}
                height={600}
                type="pie"
                data={[{ x:'Prceosados', value:alumnosProcesados}, {x: 'Sin Procesar', value:alumnosSinProcesar} ]}
                title="Alumnos con Solicitudes"
                />
            </div>

            }
            </Card>
            <Col style={{"position" : "relative"}}>
            {
            showMessage?
                <><AlertRequest message={message} click={()=>{setShowMessage(false)}} show={showMessage} error={callError}></AlertRequest></>
            :
                <></>
            }
                   <Button md="auto" variant="primary" onClick={closeAll}>Cerrar todos los formularios</Button>
            </Col>          
            </Row>          
        </Container>
    </>)
}