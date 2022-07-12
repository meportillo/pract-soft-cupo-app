import React, { useEffect, useState , useRef} from 'react';
import TableMateria from './TableMateria';
import TableCupos from './TableCupos';
import {getRequestsOfStudentAdmin } from '../../services/StudentService';
import { Badge, Button, Card, Form, ListGroup, Tab, Tabs } from 'react-bootstrap';
import CreateRequestShort from '../request/CreateRequestShort';
import { useParams } from 'react-router-dom';
import TableInscriptas from './TableInscriptas';
import { GrFormAdd } from 'react-icons/gr';
import { patchComentarFormulario } from '../../services/SubjectService';
import { AlertRequest } from '../request/AlertRequest';


export  default function ViewStudent(props){
    let { dni } = useParams();
    const [materiasAprobadas, setMateriasAprobadas]= useState([])
    const [cuposPedidos, setCuposPedidos]= useState([])
    const [alumno,setAlumno] = useState({'dni':dni})
    const [carrera,setCarrera] = useState('');
    const [coeficiente,setCoeficiente] = useState('');    
    const [createRequestShow, setCreateRequestShow] = useState(false);
    const [formulario,setFormulario] = useState();
    const [inscriptas, setInscriptas] = useState([]);
    const [solUpdate, setSolUpdate] = useState(Math.random())
    const [comentarios,setComentarios] = useState([]);
    const [comentario,setComentario] = useState('');
    const [showMessage,setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');
    const formRef = useRef(null);


    const updateSol = ()=>{
        setSolUpdate(Math.random());
    }

    const buttonAgregar = ()=>{
        return (<><Button variant="success" onClick={(e) => setCreateRequestShow(true)}>
                    Agregar Solicitudes
                </Button></>)
    }

    useEffect(() => {
        getRequestsOfStudentAdmin(dni)
        .then((data) => {
            setFormulario(data);
            setCarrera(data.carrera);
            setCoeficiente(data.coeficiente);
            setMateriasAprobadas(data.resumenCursadas);
            setAlumno({"nombre" : data.nombre, "dni": data.dni});
            setCuposPedidos(data.formulario.solicitudes);
            setInscriptas(data.formulario.comisionesInscripto);
            setComentarios(data.formulario.comentarios);
        });
    },[])

    useEffect(()=>{
        getRequestsOfStudentAdmin(dni)
        .then((data) => {
            setFormulario(data);
            setCarrera(data.carrera);
            setCoeficiente(data.coeficiente);
            setMateriasAprobadas(data.resumenCursadas);
            setAlumno({"nombre" : data.nombre, "dni": data.dni});
            setCuposPedidos(data.formulario.solicitudes);
            setInscriptas(data.formulario.comisionesInscripto);
            setComentarios(data.formulario.comentarios);           
        });        
    },[solUpdate,comentario])
    
    const comentar = ()=>{
        if(comentario==''){
            formRef.current.reset();
            setMessage('No se puede enviar comentarios vacios!');
            setShowMessage(true);
            setCallError(true);
            return;
        }
        patchComentarFormulario(formulario.formulario.id, localStorage.getItem('user').split('@')[0],comentario,dni).
        then((data)=>{
            updateSol();
            formRef.current.reset();
            setComentario('');
        }).catch(response=>{
            formRef.current.reset();
            setComentario('');
            setMessage(response.data.error+ ": " + response.data.message);
            setShowMessage(true);
            setCallError(true);
        });
    }

    const bag = ()=>{
        return(<Badge bg="secondary">{comentarios.length}</Badge>)
    }

    return (
          <>
              <div className='container'>
                <div className='row'>
                    <h3 class="d-flex justify-content-center">Gestión de Solicitudes</h3>
                </div>                
                <div className='row'>
                    <div className='row'>
                    <hr></hr>
                        <div class="col">
                            <h5>Formulario de {alumno.nombre}</h5>
                            <h5>Dni: {alumno.dni}</h5>
                        </div>
                        <div class="col">
                            <h5>Carrera: {carrera}</h5>
                            <h5>Coeficiente: {coeficiente}</h5>
                        </div>
                        <hr></hr>
                        {formulario === undefined ?  <></>:
                        <TableCupos cupos={cuposPedidos} alertUpdate={updateSol} addRequest={buttonAgregar} form={formulario}></TableCupos>
                        }
                        <hr></hr>                     
                        <Tabs defaultActiveKey="cursadas" id="uncontrolled-tab-example"  className=" mb-6">
   {

    //style={{height: '50px'}}
   }
                            <Tab eventKey="cursadas" title="Materias Cursadas" style={{height: '50px'}}>
                                    <TableMateria  materias={materiasAprobadas}> </TableMateria>
                                </Tab>
                                <Tab eventKey="inscriptas" title="Inscripcion Guarani" style={{height: '50px'}}>
                                    <TableInscriptas inscriptas={inscriptas}></TableInscriptas>
                                </Tab>
                                <Tab eventKey="historial-solicitudes" title="Historial de Solicitudes" style={{height: '50px'}}>
                                    <div>LLENAR CON EL HISTORIAL</div>
                                </Tab>
                                <Tab eventKey="comentarios-solicitudes" title={`Comentarios de Solicitudes: ${comentarios.length}`} style={{height: '50px'}}>
                                    {
                                    showMessage?
                                        <><AlertRequest message={message} click={()=>{setShowMessage(false)}} show={showMessage} error={callError}></AlertRequest></>
                                        :
                                        <></>
                                    }                                    
                                    <Card >
                                        <Card.Header>
                                            <Form ref={formRef} validated>
                                            <Form.Group className="row" controlId="commentControl">
                                                    <Form.Control className='col' type="text" placeholder="Ingresar comentario..." onKeyDown={(e)=> { if(e.key == "enter"){e.preventDefault();console.log("Enter")} console.log(e)}} onChange={(e)=>setComentario(e.target.value)} />
                                                    <Button  className='col-1' variant="info" onClick={(e) => comentar()}><GrFormAdd></GrFormAdd></Button>
                                            </Form.Group>
                                            </Form>
                                        </Card.Header>
                                        <ListGroup variant="flush" style={{ 'height': '100px', 'overflow-y': 'scroll'}}>
                                            { comentarios.length === 0 ? <>No hay Comentarios</>: comentarios.map(comentario=>{
                                                return(<ListGroup.Item>{comentario.descripcion}{' '}-{' '}{comentario.autor}{' '}-{' '}{(new Date(comentario.fecha)).toLocaleString('es-AR')}</ListGroup.Item>)
                                            })}

                                        </ListGroup>
                                    </Card>    
                                </Tab>
                          </Tabs>
                        <CreateRequestShort studentid={alumno.dni} alertUpdate={updateSol} show={createRequestShow} onHide={(e)=>{setCreateRequestShow(false)}} ></CreateRequestShort>
                    </div>


                  </div>              
              </div>  
          </>
      );
    };