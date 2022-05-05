import React, { useState, useEffect } from "react";
import { FcCancel } from "react-icons/fc";
import { getSubjects } from '../../services/SubjectService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { AlertRequest } from "./AlertRequest";
import Alert from 'react-bootstrap/Alert';    

export default function CreateRequest(props){
    const [legajo,setLegajo] = useState(props.legajo);
    const [nroDocumento, setNroDocumento] = useState(props.nroDocumento);
    const [subjects,setSubjects] = useState([]);
    const [selected,setSelected] = useState("");
    const [comisionSelected,setComisionSelected] = useState(""); 
    const [subjectsSelected,setSubjectsSelected] = useState([]);
    const [error,setError] = useState("");

    const getAllSubjects = () => {
        getSubjects
        .then(data => {
            setSubjects(data);
        })
    };
    const getComisiones = () => { 
        if (selected === ""){
            return []; 
        }
        else{
            const sub = subjects.find(sub => sub.codigo == selected);  
            return sub.comisiones;
        }
    }
    const addSubject = () => {
        if(selected === "" || comisionSelected === "") {
            setError("Falta seleccionar una materia o una comision"); 
        }
        else{
            const sub = subjects.find(sub => sub.codigo == selected);
            const repetidos = subjectsSelected.filter(s => s.codigo == sub.codigo); 
            if (repetidos.length == 0) {
                const comision = sub.comisiones.find(com => com.codComision == comisionSelected);
                const obj = {"codigo":sub.codigo, "nombre":sub.nombre,"codComision":comisionSelected,"horario":`${comision.horaInicio}-${comision.horaFin}`}
                const res =  subjectsSelected.slice();
                res.push(obj);
                setSubjectsSelected(res);
            }
            else{
                setError(`La materia ${sub.nombre} ya se agrego`); 
            }
        } 
    }
    const deleteSubjectSelected = (codSubject,e) =>{
        e.preventDefault();
        const res = subjectsSelected.filter(sub => sub.codigo != codSubject);
        setSubjectsSelected(res);
    }
    useEffect(getAllSubjects,[]);
    return( 
        <Form className="container">
            <h1></h1>
            {
                error != "" ? <Alert variant="danger" onClose={() => setError("")} dismissible>
                            {error}
                        </Alert>
                : <></>
            }
            <Form.Label className="d-flex justify-content-center"><h3>{props.encabezado}</h3></Form.Label>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label>Legajo</Form.Label>
                <Form.Control id="inputLegajo" onChange={e => setLegajo(e.target.value)} type="text" placeholder="... Numero de Legajo" />
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
                        <Form.Select id="selectMateria1" key="selectMateria" className="form-control" onChange={e => {setSelected(e.target.value)}}>
                            <option key={0} value={""} >Seleccionar opcion</option>
                            {
                            subjects.map((sub,index) => <option key={index} value={sub.codigo}>{sub.nombre}</option>)
                            }
                        </Form.Select>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title><Form.Label>Seleccionar Comisión</Form.Label></Card.Title>
                        <Form.Select id="selectComision1" key="selectComision" className="form-control" onChange={e => {setComisionSelected(e.target.value)}}>
                            <option key={0} value={""} >Seleccionar opcion</option>
                            {
                            getComisiones().map((sub,index) => <option key={index} value={sub.codComision}>{sub.horaInicio}-{sub.horaFin}</option>)
                            }
                        </Form.Select>
                        <br/>
                        <Button variant="primary" onClick={addSubject}>Agregar Materia</Button>
                    </Card.Body>
                </Card>
            </Form.Group>
            <Form.Group className="row">
                <Form.Label>
                    <Table size="sm">
                        <thead>
                            <tr key={0}>
                            <th>Cancelar</th>
                            <th>Materia</th>
                            <th>Comision</th>
                            <th>Horario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subjectsSelected.map((matSelect,index) => 
                                    <tr key={index}>
                                        <td>{<button onClick={ e => deleteSubjectSelected(matSelect.codigo,e)}><FcCancel  /></button>}</td>
                                        <td>{matSelect.nombre}</td>
                                        <td>{matSelect.codComision}</td>
                                        <td>{matSelect.horario}</td>
                                    </tr>    
                                )
                            }
                        </tbody>
                    </Table>
                </Form.Label>
                    <Button onClick={e => {}} className="col align-self-end btn btn-primary">Generar Solicitud</Button>                  
            </Form.Group>
        </Form>
    )
}