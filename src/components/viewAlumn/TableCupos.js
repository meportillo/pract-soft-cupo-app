import React, { useState } from 'react';
import { Button, ButtonGroup} from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import {patchRequest, patchCerrarFormulario} from '../../services/SubjectService';
import { AlertRequest } from '../request/AlertRequest';
import {horarioToString} from '../../utils/time';
import {optionsTable} from '../../utils/table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

export default function TableCupos({cupos, alertUpdate ,form, addRequest}){
    const [message,setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);

    const actions = (sol)=>{
        return (<>
                    <ButtonGroup>
                                <OverlayTrigger
                                    key={Math.random()}
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-accept`}>
                                            Aprobar solicitud
                                        </Tooltip>}
                                    >
                                    <Button onClick={e =>{patchRequest(form.formulario.dniAlumno,sol,'APROBADO',form.formulario.id)
                                    .then((response)=>{
                                        alertUpdate(true);
                                        if(response.status == 200){
                                            //alert("Fomulario cerrado Ok")
                                            setMessage('Solicitud APROBADA Ok');
                                            setShowMessage(true);
                                            setCallError(false);
                                        }else{
                                            setMessage(response.response.data.error+ ": " + response.response.data.message );
                                            setShowMessage(true);
                                            setCallError(true);
                                        }
                                    })
                                    .catch((error)=> {
                                      
                                    })}
                                    } variant="primary">
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
                                    <Button onClick={e =>{patchRequest(form.formulario.dniAlumno,sol,'RECHAZADO',form.formulario.id)
                                    .then((response)=>{
                                        alertUpdate(true);
                                        if(response.status == 200){
                                            //alert("Fomulario cerrado Ok")
                                            setMessage('Solicitud RECHAZADA Ok');
                                            setShowMessage(true);
                                            setCallError(false);
                                        }else{
                                            setMessage(response.response.data.error+ ": " + response.response.data.message );
                                            setShowMessage(true);
                                            setCallError(true);
                                        }
                                    })
                                    .catch((error)=> {
                                      
                                    })}
                                    }  variant="danger">
                                        <FiX></FiX>
                                    </Button>
                                    </OverlayTrigger>
                                </ButtonGroup>        
        </>)
    }

    const columns = [{
        dataField: 'comision.materia',
        text: 'Materia',
        sort: true,
        classes: 'w-25 p-3'
      } , {
        dataField: 'comision.id',
        text: 'Comision',
        sort: true
      }, {
        dataField: 'comision.modalidad',
        text: 'Modalidad',
        sort: true,
        style: {
          width: 'auto' 
        }        
      },{
        dataField: 'comision.horarios',
        text: 'Horario',
        sort: true,
        style: {
          width: 'auto' 
        },
        formatter: horarioToString      
      },{
        dataField: 'estado',
        text: 'Estado',
        sort: true
      },
      {
        dataField: 'id',
        text: 'Acciones',
        sort: true,
        formatter:  actions   
      }
    ];



    const rowStyle = (row, rowIndex) => {
        const style =(row.estado === 'APROBADO')? {background: 'rgb(148, 255, 163)'} : 
        ((row.estado === 'RECHAZADO')? {background: 'rgba(247, 148, 123, 0.788)'}: {
            background: 'rgba(250, 252, 157, 0.842)'});
        return style;
      };

    return (<>
        {
            showMessage?
                <><AlertRequest message={message} click={()=>{setShowMessage(false)}} show={showMessage} error={callError}></AlertRequest></>
            :
                <></>
        }
        <h5 class="d-flex justify-content-center">Cupos Pedidos</h5>
        <div className='col-6'>
            <ButtonGroup>
            <Button onClick={e =>{ patchCerrarFormulario(form.formulario.id,form.formulario.dniAlumno).then((response)=>{
                if(response.status == 200){
                    alertUpdate(true);
                    //alert("Fomulario cerrado Ok")
                    setMessage('Fomulario cerrado Ok');
                    setShowMessage(true);
                    setCallError(false);
                }
            }
            )}}>Cerrar Formulario</Button>
            {addRequest()}       
            </ButtonGroup>
            <br></br>         
        </div>       
        <BootstrapTable keyField='nombreMateria' data={ form.formulario.solicitudes } columns={ columns } pagination={ paginationFactory(optionsTable(form.formulario.solicitudes.length, 2,5))} rowStyle={rowStyle} 
        striped hover condensed>
        </BootstrapTable>
       </>)
}