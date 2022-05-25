import React, { useEffect, useState } from 'react';
import { getInfoStudent } from '../../helpers/getInfoStudent';
import TableMateria from './TableMateria';
import TableCupos from './TableCupos';

export  default function ViewStudent(props){

    const [materiasAprobadas, setMateriasAprobadas]= useState([])
    const [cuposPedidos, setCuposPedidos]= useState([])
    const [alumno,setAlumno] = useState({})

    useEffect(() => {

        let materias = [{ //Temporal hasta que el endpoind del back
            "cantidadDeVecesCursada": 2,
            "codigoMateria": "01307",
            "estado": "DESAPROBADO",
            "fechaDeCarga": "2020/10/15",
            "nombreMateria": "Introduccion a la Programacion"
        }]

        getInfoStudent(12345677)
        .then((data) => {
            let {dni,nombre,formulario : {estado,solicitudes},resumenCursadas}  = data;
            setMateriasAprobadas(materias);
            setAlumno({"nombre" : nombre, "dni": dni});
            setCuposPedidos(solicitudes);
        })
    },[])


    return (
        <>
            <div className='container'>
                <div>
                    <h4>{alumno.nombre}</h4>
                    <h4>Dni : {alumno.dni}</h4>
                </div>
                <TableMateria materias={materiasAprobadas}> </TableMateria>
                <TableCupos cupos={cuposPedidos}></TableCupos>   
            </div>  
        </>
      );
    };