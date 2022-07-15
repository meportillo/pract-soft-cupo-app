import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni } from '../../services/SubjectService';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {optionsTable} from '../../utils/table';


export default function TableHistory({solicitudes}) {

    const rowStyle = (row, rowIndex) => {
        const style =(row.estado === 'APROBADO')? {background: 'rgb(127,255,0)'} : 
        ((row.estado === 'RECHAZADO')? {background: 'rgba(247, 148, 123, 0.788)'}: {
            background: 'rgba(250, 252, 157, 0.842)'});
        return style;
      };

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
        <BootstrapTable keyField='materia' data={ solicitudes } columns={ columns } pagination={ paginationFactory(optionsTable(solicitudes.length,2,5)) } rowStyle={rowStyle}
        striped hover condensed>
        </BootstrapTable>
      </>
    );


}
