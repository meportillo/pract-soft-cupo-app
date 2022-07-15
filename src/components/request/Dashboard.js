import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { closeAllRequests, getAlumnosSolicFiltro, getCuatrimestreByanio } from "../../services/SubjectService";

import AnyChart from "anychart-react";
import CountDown from "./countDown/CountDown";
import { AlertRequest } from "./AlertRequest";
import { periodoActual } from "../../utils/time";

export default function Dashoard(){
    const [cuatrimestre, setCuatrimestre] = useState(null);
    const [alumnosProcesados, setAlumnosProcesados] = useState(undefined);
    const [alumnosSinProcesar, setAlumnosSinProcesar] = useState(undefined);
    const [message,setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);

    useEffect(()=>{
        getCuatrimestreByanio(periodoActual().anio,periodoActual().S)
        .then(response=>{
            setCuatrimestre(response.data);
        })
        .catch(error=>{
        });
        getAlumnosSolicFiltro('FALTA_PROCESAR')
        .then(response=>{
            setAlumnosSinProcesar(response.data.length);
        })
        .catch(error=>{
        });
        getAlumnosSolicFiltro('PROCESADO')
        .then(response=>{
            setAlumnosProcesados(response.data.length);
        })
        .catch(error=>{
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
            })
        }
     }
// <Card>
//     <Card.Header> {cuatrimestre.semestre == 'S1' ? 'Primer': 'Segundo'} Cuatrimestre - { cuatrimestre.anio }</Card.Header>
//     <Card.Body>
//     Tiempo restante para que finalice el proceso de inscripciones en Guarani:
//     <CountDown targetDate={dateTimeAfterThreeDays} />
//         <blockquote className="blockquote mb-0">
//         <p>
//             <br></br>
//             Fin de Inscripciones: {new Date(cuatrimestre.finInscripciones).toLocaleString().split(",")[0]}{' '}
//         </p>
//         </blockquote>
//         <div>

//         </div>
//     </Card.Body>
// </Card>        
    return(<>
        <Form.Label className="d-flex justify-content-center"><h3>Dashboard General de Solicitudes</h3></Form.Label>
        <Container>
            <Row>
            <hr></hr>
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
                data={[{ x:'Procesados', value:alumnosProcesados}, {x: 'Sin Procesar', value:alumnosSinProcesar} ]}
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