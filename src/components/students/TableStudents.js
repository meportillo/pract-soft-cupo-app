import React, { Component, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Col, Form, Row, Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni } from '../../services/SubjectService';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


export default function TableStudents() {

    const [alumnos, setAlumnos]= useState([]);
    const [search,setSearch] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAlumnos()
        .then((data) => {
            console.log(data);
            setAlumnos(data);
        });
    },[])

    const action = (cell, row, rowIndex)=>{

      return(<ButtonGroup>
              <Button
                key={Math.random()}
                onClick={(e) => navigate('/student/'+ cell)}>
                      Ver
              </Button>
      </ButtonGroup>)
    }

    const updateTime = () => {
      getAlumnosByDni(search)
      .then((data) => {
        setAlumnos(data)
      })
    }

    const columns = [{
      dataField: 'alumno.nombre',
      text: 'Nombre',
      sort: true,
      classes: 'w-25 p-3'
    } , {
      dataField: 'alumno.dni',
      text: 'DNI',
      sort: true
    }, {
      dataField: 'alumno.legajo',
      text: 'Legajo',
      sort: true,
      style: {
        width: 'auto' 
      }        
    },{
      dataField: 'alumno.correo',
      text: 'Correo',
      sort: true,
      style: {
        width: 'auto' 
      }      
    },{
      dataField: 'alumno.coeficiente',
      text: 'Coeficiente',
      sort: true
    },
    {
      dataField: 'alumno.dni',
      text: 'Acciones',
      sort: true,
      formatter:  action   
    }
    
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Mostrando { from } hasta { to } de { size } Elementos
    </span>
  );
  
  const options = {
    paginationSize: 4,
    pageStartIndex: 0,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'Primero',
    prePageText: 'Anterior',
    nextPageText: 'Proximo',
    lastPageText: 'Ultimo',
    nextPageTitle: '1a Pagina',
    prePageTitle: 'Anterior',
    firstPageTitle: 'Proxima',
    lastPageTitle: 'Ultima',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [{
      text: '2', value: 2
    }, {
      text: '5', value: 5
    }, {
      text: 'All', value: alumnos.length
    }] // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
      <>
      <Form>
      <Row className="mb-3">
        <Col>
        <Form.Control
                    placeholder="Introduzca un dni"
                    type="text"
                    id="search"
                    aria-describedby="passwordHelpBlock"
                    onChange={(e) => {
                          setSearch(e.target.value)
                      }
                    } 
        />
        </Col>
        <Button as={Col} md="auto" onClick={updateTime}  variant="primary">Filtrar</Button>
        </Row>
        </Form>
        <BootstrapTable keyField='alumno.legajo' data={ alumnos } columns={ columns } pagination={ paginationFactory(options) } >
        </BootstrapTable>

      </>
    );


}
