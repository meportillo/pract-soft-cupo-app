import React, { useEffect, useState } from 'react';
import TableMateria from './TableMateria';
import TableCupos from './TableCupos';
import {getRequestsOfStudentAdmin } from '../../services/StudentService';
import { Button, Tab, Tabs } from 'react-bootstrap';
import CreateRequestShort from '../request/CreateRequestShort';
import { useParams } from 'react-router-dom';
import TableInscriptas from './TableInscriptas';


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
        });        
    },[solUpdate])
    
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
                            <h5> Coeficiente: {coeficiente}</h5>
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
                          </Tabs>
                        <CreateRequestShort studentid={alumno.dni} alertUpdate={updateSol} show={createRequestShow} onHide={(e)=>{setCreateRequestShow(false)}} ></CreateRequestShort>
                    </div>


                  </div>              
              </div>  
          </>
      );
    };