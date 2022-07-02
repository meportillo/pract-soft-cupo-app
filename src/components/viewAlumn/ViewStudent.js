import React, { useEffect, useState } from 'react';
import TableMateria from './TableMateria';
import TableCupos from './TableCupos';
import {getRequestsOfStudentAdmin } from '../../services/StudentService';
import { Button, ButtonGroup } from 'react-bootstrap';
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

    useEffect(() => {
        getRequestsOfStudentAdmin(dni)
        .then((data) => {
            console.log("DATA",data);
            setCarrera(data.carrera);
            setCoeficiente(data.coeficiente);
            setMateriasAprobadas(data.resumenCursadas);
            setAlumno({"nombre" : data.nombre, "dni": data.dni});
            setCuposPedidos(data.formulario.solicitudes);
            setFormulario(data);
            setInscriptas(data.formulario.comisionesInscripto);
        });
    },[])
        
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
                        <TableMateria materias={materiasAprobadas}> </TableMateria>
                        <TableInscriptas inscriptas={inscriptas}></TableInscriptas>
                        <TableCupos cupos={cuposPedidos} form={formulario}></TableCupos>
                        <CreateRequestShort studentid={alumno.dni} show={createRequestShow} onHide={(e)=>{setCreateRequestShow(false)}} ></CreateRequestShort>
                    </div>

                    <div className='row'>
                        <div className='col-3'>
                            <Button variant="success" onClick={(e) => setCreateRequestShow(true)}>
                                Agregar Solicitudes
                            </Button>
                        </div>
                    </div>
                  </div>              
              </div>  
          </>
      );
    };