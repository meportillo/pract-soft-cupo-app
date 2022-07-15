import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni } from '../../services/SubjectService';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {optionsTable} from '../../utils/table';


export default function TableHistory({solicitudes}) {

    // const [alumnos, setAlumnos]= useState([]);
    // const [search,setSearch] = useState([]);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     getAlumnos()
    //     .then((data) => {
    //         setAlumnos(data);
    //     });
    // },[])
    console.log(solicitudes)

    const columns = [{
      dataField: 'nombreMateria',
      text: 'Materia',
      sort: true,
      classes: 'w-25 p-3'
    } , {
      dataField: 'cuatrimestre.semestre',
      text: 'Cuatrimestre',
      sort: true
    },{
      dataField: 'cuatrimestre.anio',
      text: 'Fecha',
      sort: true   
    },{
      dataField: 'estado',
      text: 'Estado',
      sort: true
    }
  ];
  return (
      <>
        <BootstrapTable keyField='materia' data={ solicitudes } columns={ columns } pagination={ paginationFactory(optionsTable(solicitudes.length,2,5)) } 
        striped hover condensed>
        </BootstrapTable>
      </>
    );


}
