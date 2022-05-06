import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function FilterRequests(props){

    const [year, setYear] = useState();
    const [career, setCareer] = useState();
    const [states, setSates] = useState([]);
    const [quarters, setQuarters] = useState([])
    const [legajo, setLegajo] = useState('');
    const [dni, setDni] = useState('');

    const addStateRquest = (e, evt) =>{
        //TODO: validar si se hace check false para eliminar
        let tmp = states;
        tmp.push(e);
        setSates(tmp);
    };

    const addQuarterRquest = (e) => {
        //TODO: validar si se hace check false para eliminar
        let tmp = quarters;
        tmp.push(e);
        setQuarters(tmp);
    };

    const clear = () => {
        //TODO limpiar filtros y tal vez tabla
    }

    return(<>
    <Form.Group className='container'>
        <Form.Group className="row">
            <Form.Label className="col">Año: 
                <Form.Select value={year} onChange={e => setYear(e.target.value)} aria-label="Default select example">
                    <option>Seleccionar Ciclo Lectivo</option>
                    {// Aca deberia recibir una lista de cilclos lectivos a traves de props
                    }
                    {['2022','2021','2020','2019'].map(e => <option key={e} value={e}>{e}</option>)}
                </Form.Select>  
            </Form.Label>            
            <Form.Label className="col">Carrera: 
                <Form.Select value={career} onChange={e => setCareer(e.target.value)} aria-label="Default select example">
                    <option>Seleccionar Carrera</option>
                    {// Aca deberia recibir una lista de carreras lectivos a traves de props
                    }
                    {[{id:1, nombre:'Tecnicatura Universitaria en Programacion Informatica'},{id:2, nombre:'Licenciatura en Informatica'},{id:3, nombre:'Licenciatura en Bioinformatica'}].map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </Form.Select>  
            </Form.Label>            
        </Form.Group>
        <Form.Group>
            <Form.Label>Estado de solicidudes: </Form.Label>
                    {// Aca deberia recibir una lista de estados lectivos a traves de props
                    }
                    {
                        [{id:1,nombre:"Abierta" },{id:2,nombre:"Cerrada"},{id:3,nombre:"Aceptada"},{id:4,nombre:"Rechazada" }]
                        .map(e => 
                            <Form.Check
                            inline
                            key={e.id}
                            label={e.nombre}
                            name={e.nombre}
                            type="checkbox"
                            id={e.id}
                            onChange={ evt => addStateRquest(e)}/>)
                    }
        </Form.Group>
        <br></br>
        <Form.Group>
            <Form.Label>Cuatrimestre: </Form.Label>
            {
                [{id:1,nombre:"Primer" },{id:2,nombre:"Segundo"}]
                .map(e => 
                            <Form.Check
                            inline
                            key={e.id}
                            label={e.nombre}
                            name={e.nombre}
                            type="checkbox"
                            id={e.id}
                            onChange={ evt => addQuarterRquest(e, evt)}/>)
            }
        </Form.Group>
        <Form.Group >
            <Form.Label>
                Datos del Alumno:
            </Form.Label>
            <Form.Group className="row justify-content-md-center">
                <Form.Label className="col">
                    Legajo: 
                    <Form.Control type="text" onChange={e => setLegajo(e.target.value)} placeholder="Legajo"/>
                </Form.Label>
                <Form.Label className="col">
                    Dni: 
                    <Form.Control  type="text" onChange={e => setDni(e.target.value)} placeholder="Dni"/>
                </Form.Label>
            </Form.Group>
            <Form.Group className="row">
            </Form.Group>
        </Form.Group>
        <Form.Group className="row">
            <div className="col"></div>
            <div className="col"></div>
            <ButtonGroup className="col">
                <Button  onClick={ e => clear()} className="col order-last" variant="secondary">Limpiar</Button>{' '}
                <Button  onClick={ e => props.onClickFilter({ 'year': year, 'career': career, 'statesRequest': states, 'quarters': quarters, 'legajo': legajo, 'dni': dni })} className="col order-last"variant="primary">Filtrar</Button>{' '}
            </ButtonGroup>
        </Form.Group>
    </Form.Group>
    </>)
}