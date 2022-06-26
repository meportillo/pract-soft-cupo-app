import React, { useEffect, useState } from 'react';
//import { getInfoStudent } from '../../helpers/getInfoStudent';
import TableMateria from './TableMateria';
import TableCupos from './TableCupos';
import { getRequestsOfStudent } from '../../services/StudentService';
import { Button, ButtonGroup } from 'react-bootstrap';
import CreateRequestShort from '../request/CreateRequestShort';
import { useParams } from 'react-router-dom';

export  default function ViewStudent(props){

    let { dni } = useParams();
    const [materiasAprobadas, setMateriasAprobadas]= useState([])
    const [cuposPedidos, setCuposPedidos]= useState([])
    const [alumno,setAlumno] = useState({'dni':dni})
    const [createRequestShow, setCreateRequestShow] = useState(false);
    const [formulario,setFormulario] = useState()

    useEffect(() => {
        getRequestsOfStudent(dni)
        .then((data) => {
            setMateriasAprobadas(data.resumenCursadas);
            setAlumno({"nombre" : data.nombre, "dni": data.dni});
            setCuposPedidos(data.formulario.solicitudes);
            setFormulario(data);          
        });
    },[])
        
    return (
          <>
              <div className='container'>
                  <div className='row'>
                    <div>
                        <h4>Formulario de {alumno.nombre}</h4>
                        <h4>Dni : {alumno.dni}</h4>
                        <TableMateria materias={materiasAprobadas}> </TableMateria>
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