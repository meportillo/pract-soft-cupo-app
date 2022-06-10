import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import {patchRequest, patchCerrarFormulario} from '../../services/SubjectService';

export default function TableCupos({cupos, form}){
    console.log('for',form);
    
    function horarioToString(horarios){
        return horarios && horarios.map(({dia,inicio,fin}) => {
            return <div> {dia} {inicio}-{fin}</div>
        })
    }

    return (<>
        <h4>Cupos Pedidos</h4>
        <Table striped bordered hover className='Cupos'>
            <tbody>
                <tr>
                    <td>Materia</td>
                    <td>Comision</td>
                    <td>Modalidad</td>
                    <td>Horario</td>
                    <td>Estado</td>
                    <td>Acciones</td>
                </tr>{form &&
                   form.formulario.solicitudes.map((sol) => {
                        return(
                        <tr key={sol.id}>
                            <td>{sol.comision.materia}</td>
                            <td>{sol.comision.id}</td>
                            <td>{sol.comision.modalidad}</td>
                            <td>{horarioToString(sol.comision.horarios)}</td>
                            <td>{sol.estado}</td>
                            <td>
                            <Row className="mx-0">
                                <ButtonGroup>
                                <OverlayTrigger
                                    key="accept-id"
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-accept`}>
                                            Aprobar solicitud
                                        </Tooltip>}
                                    >
                                    <Button onClick={e =>{patchRequest(form.formulario.dniAlumno,sol.id,'APROBADO',form.formulario.id, (data)=>{console.log(data)}) }} variant="primary">
                                        <FiCheck></FiCheck>
                                    </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                    key="accept-id"
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-accept`}>
                                            Rechazar solicitud
                                        </Tooltip>
                                    }>
                                    <Button onClick={e =>{patchRequest(form.formulario.dniAlumno,sol.id,'RECHAZADO',form.formulario.id, (data)=>{console.log(data)}) }}  variant="danger">
                                        <FiX></FiX>
                                    </Button>
                                    </OverlayTrigger>
                                </ButtonGroup>
                            </Row>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
        <Button onClick={e =>{ patchCerrarFormulario(form.formulario.id,form.formulario.dniAlumno).then((response)=>{
            console.log(response)
            if(response.status == 200){
                alert("Fomulario cerrado Ok")
            }
        }
        )}}>Cerrar Formulario</Button>
        </>)
}