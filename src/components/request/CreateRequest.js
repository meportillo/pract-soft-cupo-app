import React, { useState, useEffect } from "react";
import { FcCancel } from "react-icons/fc";
import { getSubjects } from '../../services/SubjectService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { AlertRequest } from "./AlertRequest";

export default function CreateRequest(props)  {

    const [legajo,setLegajo] = useState(props.legajo);
    const [nroDocumento, setNroDocumento] = useState(props.nroDocumento);
    const [materias, setMaterias] = useState(props.materias);
    const [materia, setMateria] = useState({});
    const [subOptions, setSubOptions] = useState([]);
    const [comisionTemp, setComisionTemp] = useState({});
    const [opcionesMaterias, setOpcionesMaterias] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const _submit = (e)=> {
        e.preventDefault();
        console.log('Solicitud de cupo', e);
        console.log(materias);
        console.log(opcionesMaterias);        
        console.log(legajo);
        console.log(nroDocumento);
        _clean(e);
    };

    useEffect(()=>{
        getSubjects
        .then(collejeSubject => 
            setOpcionesMaterias(collejeSubject.map( function(elem){
                var ret = {"value": elem, "label": elem.nombre} 
                return ret;          
            }))
        )
        .catch( error=> {
            console.error("ERROR ", error)
        })
    },[]);


    
    useEffect(() => {
        async function  updateOption(){
            console.log('async ---> ', materia);
            setSubOptions(materia.comisiones);
            console.log(subOptions);
        }
        updateOption();
    },[materia]);
    
    useEffect(()=>{
    console.log('userEffect ---->   ' );
    },[]);

    const _clean = (e) => {
        e.preventDefault();
        setLegajo('');
        setMaterias([]);
        setSubOptions([]);
        setNroDocumento('');
    };
    
    const _cleanCom= (com, evt)=> {
        evt.preventDefault();
        let mates = materias.filter(mat => mat.codigo != com.codigo);
        //mates.push(mate);
        setMaterias(mates);
        setShowAlert(false);

    };

    const _onClick = (e)=> {
        let mate = JSON.parse(e.target.value);
        if(materias.filter(mat => mat.codigo == mate.codigo).length == 0){
            let mates = materias;
            mates.push(mate);
            setMateria(mates);
            setShowAlert(false);
        }else{
            setShowAlert(true);
        }
    }

    return(
        <>
            <Form className="container">
                <Form.Label>Completar la Siguiente Solicitud para iniciar el proceso de alta de Cupo</Form.Label>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                        <Form.Label>Legajo</Form.Label>
                        <Form.Control onChange={e => setLegajo(e.target.value)} type="text" placeholder="... Numero de Legajo" />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                        <Form.Label>Número de Documento</Form.Label>
                        <Form.Control onChange={e => setNroDocumento(e.target.value)} type="text" placeholder="... Numero de Documento" />
                    </Form.Group>
                    <Form.Group >
                    <Card>
                        <Card.Header>
                            <Form.Label>Seleccionar Materias</Form.Label>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title><Form.Label>Seleccionar Materia</Form.Label></Card.Title>
                            <Form.Select id="selectMateria1" key="selectMateria" className="form-control" onChange={e => { 
                                    setMateria(JSON.parse(e.target.value));
                                    console.log(e.target);
                                }
                                }>
                                <option key={Math.random()} >Seleccionar opcion</option>
                            {
                            opcionesMaterias.map( function(e){ 
                                    return <option key={Math.random()} value={JSON.stringify(e.value)}>{e.label}</option>
                                })
                            }
                        </Form.Select>
                        <Card.Title><Form.Label>Seleccionar Comision</Form.Label></Card.Title>
                        <Form.Select aria-label="Default select example" onChange={e => { setComisionTemp(e.target.value)}}>
                            <option key={Math.random()} >Seleccionar opcion</option>
                            {
                            (subOptions) ? subOptions.map( function(comision){ 
                                return <option key={Math.random()} value={JSON.stringify({ 'codigo':materia.codigo , 'codComision': comision.codComision, 'nombre':materia.nombre, 'horario':comision.horaInicio+ "-"+comision.horaFin })}>
                                    {comision.codComision + " - Horario:" +" " + comision.horaInicio+ "-"+comision.horaFin }
                                    </option>
                            }): <></>
                            }
                        </Form.Select>
                        <br/>
                        <Button value={comisionTemp} variant="primary" onClick={e => _onClick(e)}>Agregar Materia</Button>
                        </Card.Body>
                    </Card>
                    </Form.Group>
                    <Form.Group className="row">
                    <Form.Label>
                        {showAlert? <AlertRequest message="Ya se encuentra seleccionada" show={showAlert}></AlertRequest>:
                        <></>}
                        <Table size="sm">
                            <thead>
                                <tr key={Math.random()}>
                                <th>Cancelar</th>
                                <th>Materia</th>
                                <th>Comision</th>
                                <th>Horario</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   materias.map(matSelect => 
                                        <tr key={Math.random()}>
                                            <td>{<button value={matSelect.codigo} onClick={ e => _cleanCom(matSelect, e)}><FcCancel  /></button>}</td>
                                            <td>{matSelect.nombre}</td>
                                            <td>{matSelect.codComision}</td>
                                            <td>{matSelect.horario}</td>
                                        </tr>    
                                    )
                                }
                            </tbody>
                        </Table>
                    </Form.Label>
                        <Button onClick={e => _submit(e)} type="submit" className="col align-self-end btn btn-primary">Generar Solicitud</Button>                  
                    </Form.Group>
                </Form>      
            </>
        );
}