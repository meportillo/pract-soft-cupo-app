import React, { Component, useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Form, Row, Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni } from '../../services/SubjectService';

export default function TableStudents() {

    const [alumnos, setAlumnos]= useState([]);
    const [search,setSearch] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAlumnos()
        .then((data) => {
            setAlumnos(data)
        });
    },[])

    const updateTime = () => {
      getAlumnosByDni(search)
      .then((data) => {
        setAlumnos(data)
      })
    }


    return (
      <>
      <Form as={Row} >
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
        <Button as={Col} onClick={updateTime}  variant="primary">Filtrar</Button>
        </Form>
        <Table striped bordered hover className="Alumnos">
          <thead>
            <tr key={Math.random()}>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Legajo</th>
              <th>Correo</th>
              <th>Coeficiente</th>
              <th>Estado Formulario</th>
              <th>Acceder </th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(
              ({
                alumno: { dni, nombre, apellido, correo, legajo, coeficiente },
                estadoFormulario,
              }) => {
                return (
                  <>
                    <tr key={dni}>
                      <td>{nombre + " " + apellido}</td>
                      <td>{dni}</td>
                      <td>{legajo}</td>
                      <td>{correo}</td>
                      <td>{coeficiente}</td>
                      <td>{estadoFormulario}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            key={Math.random()}
                            onClick={(e) =>navigate('/student/'+ dni)}
                          >
                            Ver
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  </>
                );
              }
            )}
          </tbody>
        </Table>
      </>
    );


}
