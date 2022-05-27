import React, { useEffect, useState } from 'react';
import { getInfoStudent } from '../../helpers/getInfoStudent';
import TableMateria from './TableMateria';
import TableCupos from './TableCupos';
//import { getStudents } from '../../services/AlumnService';
import { Button, ButtonGroup } from 'react-bootstrap';
import CreateRequestShort from '../request/CreateRequestShort';

export  default function ViewStudent(props){

    const [materiasAprobadas, setMateriasAprobadas]= useState([])
    const [cuposPedidos, setCuposPedidos]= useState([])
    const [alumno,setAlumno] = useState({'dni': '1234567'})
    const [createRequestShow, setCreateRequestShow] = useState(false);

    useEffect(() => {

        let materias = [{ //Temporal hasta que el endpoind del back
            "cantidadDeVecesCursada": 2,
            "codigoMateria": "01307",
            "estado": "DESAPROBADO",
            "fechaDeCarga": "2020/10/15",
            "nombreMateria": "Introduccion a la Programacion"
        }]

        getInfoStudent(12345677)
        .then(({dni,nombre,formulario : {estado,solicitudes},resumenCursadas}) => {
            setMateriasAprobadas(materias);
            setAlumno({"nombre" : nombre, "dni": dni});
            setCuposPedidos(solicitudes);
        })
    },[])


    return (
          <>
              <div className='container'>
                  <div>
                      <h4>Formulario de {alumno.nombre}</h4>
                      <h4>Dni : {alumno.dni}</h4>
                  </div>
                  <TableMateria materias={materiasAprobadas}> </TableMateria>
                  <TableCupos cupos={cuposPedidos}></TableCupos>   
              </div>  
              <CreateRequestShort studentId={alumno.dni} show={createRequestShow} onHide={(e)=>{setCreateRequestShow(false)}} ></CreateRequestShort>
                  <Button variant="success" onClick={(e) => setCreateRequestShow(true)}>
                      Agregar Solicitudes
                  </Button>              
          </>
      );
    };