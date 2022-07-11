import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni } from '../../services/SubjectService';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {optionsTable} from '../../utils/table';


export default function TableStudents() {

    const [alumnos, setAlumnos]= useState([]);
    const [search,setSearch] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAlumnos()
        .then((data) => {
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
        <BootstrapTable keyField='alumno.legajo' data={ alumnos } columns={ columns } pagination={ paginationFactory(optionsTable(alumnos.length,2,5)) } 
        striped hover condensed>
        </BootstrapTable>

      </>
    );


}
