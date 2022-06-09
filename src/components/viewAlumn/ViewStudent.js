import React, { useEffect, useState } from 'react';
import { getInfoStudent } from '../../helpers/getInfoStudent';
import TableMateria from './TableMateria';
import TableCupos from './TableCupos';
//import { getStudents } from '../../services/AlumnService';
import { Button, ButtonGroup } from 'react-bootstrap';
import CreateRequestShort from '../request/CreateRequestShort';
import { useParams } from 'react-router-dom';
import { getRequestsOfStudent } from '../../services/AlumnService';

export  default function ViewStudent(props){

    let { dni } = useParams();
    const [materiasAprobadas, setMateriasAprobadas]= useState([])
    const [cuposPedidos, setCuposPedidos]= useState([])
    const [alumno,setAlumno] = useState({'dni':dni})
    const [createRequestShow, setCreateRequestShow] = useState(false);


    useEffect(() => {
        getRequestsOfStudent(dni)
        .then(({dni,nombre,formulario : {estado,solicitudes},resumenCursadas}) => {
            setMateriasAprobadas(resumenCursadas);
            setAlumno({"nombre" : nombre, "dni": dni});
            setCuposPedidos(solicitudes);
        })
    },[])


    return (
          <>
          <br></br>
              <div className='container'>
                  <div>
                      <h4>Formulario de {alumno.nombre}</h4>
                      <h4>Dni : {alumno.dni}</h4>
                  </div>
                  <TableMateria materias={materiasAprobadas}> </TableMateria>
                  <TableCupos cupos={cuposPedidos}></TableCupos>
                  <CreateRequestShort studentId={alumno.dni} show={createRequestShow} onHide={(e)=>{setCreateRequestShow(false)}} ></CreateRequestShort>
                  <Button variant="success" onClick={(e) => setCreateRequestShow(true)}>
                      Agregar Solicitudes
                  </Button>              
              </div>  
          </>
      );
    };