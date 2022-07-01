import React, { Component, useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Form, Row, Table } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni, getSubjectsComplete } from '../../services/SubjectService';

export default function TableSubjects() {

    const [subjects, setSubjects]= useState([]);

    useEffect(() => {
        getSubjectsComplete()
        .then((data) => {
            setSubjects(data)
        });
    },[])

    return (
      <>
        <Table striped bordered hover className="Alumnos">
          <thead>
            <tr key={Math.random()}>
              <th>Nombre</th>
              <th>Codigo materia</th>
              <th>Carrera</th>
              <th>Correlativas</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map(({codigo,nombre,carrera,correlativas}) =>
            <>
                <tr key={codigo}>
                      <td>{nombre}</td>
                      <td>{codigo}</td>
                      <td>{carrera}</td>
                      <td>
                        <Table size='sm' striped bordered hover responsive='sm'>
                            <thead>
                            <tr key={Math.random()}>
                                <th>Nombre</th>
                            </tr>
                            </thead>
                            <tbody>
                                {correlativas.length == 0 ?
                                    <> 
                                        <tr>
                                            <td>No tiene</td>
                                        </tr>             
                                    </> 
                                    :
                                    <>
                                        {correlativas.map(mat =>
                                        <>
                                            <tr>
                                                <th>{mat}</th>
                                            </tr>
                                        </>
                                        )}
                                    </>
                                }
                            </tbody>
                        </Table>
                      </td>
                </tr>
            </>
            )}
          </tbody>
        </Table>
      </>
    );


}
