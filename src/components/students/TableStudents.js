import React, { Component, useEffect, useState } from 'react'
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAlumnos } from '../../services/SubjectService';

export default function TableStudents() {

    const [alumnos, setAlumnos]= useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAlumnos()
        .then((data) => {
            setAlumnos(data)
        });
    },[])


    return (
      <>
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
