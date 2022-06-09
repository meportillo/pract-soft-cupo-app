import React, { useState, useEffect } from "react";
import { FcCancel } from "react-icons/fc";
import { getSubjectsOfStudent, sendRequest } from '../../services/AlumnService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';    
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";


export default function CreateRequest(props){
    const [subjects,setSubjects] = useState([]);
    const [selected,setSelected] = useState("");
    const [subjectsSelected,setSubjectsSelected] = useState([]);
    const [comisiones,setComisiones] = useState([]);
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const getAllSubjects = () => {
        getSubjectsOfStudent(getUser())
        .then(data => {
            setSubjects(data);
        })
        // getSubjects
        // .then(data => {
        //     setSubjects(data);
        // })
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
        if(selected === "" || comisiones.length === 0) {
            setError("Falta seleccionar una materia o una comision"); 
        }
        else{
            // if (subjectsSelected.filter(sub => sub.codigo == selected ).length == 0) {
                const subj = subjects.find(sub => sub.codigo == selected);
                const coms = getComisiones(); 
                const comsSelected = coms.filter((com,index) => comisiones.includes(`${index}`))
                const obj = { "codigo":subj.codigo, "nombre": subj.nombre, "comisiones":comsSelected };
                let clone = subjectsSelected.map((sub) =>{ return {...sub}}) 
                clone.push(obj);
                setSubjectsSelected(clone);
            // }
            // else{
                // setError(`La materia ya se agrego`); 
            // }
        } 
    }
    const deleteSubjectSelected = (codSubject,e) =>{
        e.preventDefault();
        const res = subjectsSelected.filter(sub => sub.codigo != codSubject);
        setSubjectsSelected(res);
    }
    const addCommission = (toAdd, indexComision) => {
        if (toAdd) {
            let copy = comisiones.slice();
            copy.push(indexComision) 
            setComisiones(copy)
        }
        else{
            const copy = comisiones.filter(com => com != indexComision)
            setComisiones(copy)        
        }
    }
    const selectSubject = (idSubject) => {
        document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
        if (selected != idSubject) {
            setComisiones([]);
            setSelected(idSubject)
        }
    }

    useEffect(getAllSubjects,[]);
    
    const sendForm = () => {
        sendRequest(subjectsSelected,getUser())
        .then(res => {
            console.table(res)
            navigate('/')
        })
        .catch(err => {
            setError(err); 
        })
    }
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
            <Form.Group >
                <Card>
                    <Card.Header>
                        <Form.Label>Seleccionar Materias</Form.Label>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title><Form.Label>Seleccionar Materia</Form.Label></Card.Title>
                        <Form.Select id="selectMateria1" key="selectMateria" className="form-control" onChange={e => {selectSubject(e.target.value)}}>
                            <option key={0} value={""} >Seleccionar opcion</option>
                            {
                            subjects.map((sub,index) => <option key={index} value={sub.codigo}>{sub.nombre}</option>)
                            }
                        </Form.Select>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title><Form.Label>Seleccionar Comisión</Form.Label></Card.Title>
                        <div>
                            {
                            getComisiones().map((sub,index) =>  {
                                let horarios = sub.horarios.map(c => `${c.dia} ${c.inicio}-${c.fin}`) 
                                horarios = horarios.join() 
                                return (<div key={index}>
                                        <input type="checkbox" value={index} onChange={(e)=>addCommission(e.target.checked, e.target.value)} />
                                        <span style={{"paddingLeft" : "10px"}}>{`Comision ${sub.comision}-${sub.modalidad} ${horarios}`}</span>
                                        </div>)                              
                            }     
                            )
                            }

                        </div>
                        <br></br>    
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
                            <th>Codigo</th>
                            <th>comisiones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                subjectsSelected.map((matSelect,index) =>{
                                    const comsMat = matSelect.comisiones.map(m => `comision ${m.comision}`).join()  
                                    return (<tr key={index}>
                                            <td>{<button onClick={ e => deleteSubjectSelected(matSelect.codigo,e)}><FcCancel  /></button>}</td>
                                            <td>{matSelect.nombre}</td>
                                            <td>{matSelect.codigo}</td>
                                            <td>{comsMat}</td>
                                            </tr>)    
                                } 
                                )
                            }
                        </tbody>
                    </Table>
                </Form.Label>
                    <Button onClick={sendForm} className="col align-self-end btn btn-primary">Generar Solicitud</Button>                  
            </Form.Group>
        </Form>
    )

}