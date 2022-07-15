import { useRef, useState } from "react"
import { Button, Container, Form, Accordion } from "react-bootstrap";
import { createAlum, deleteAlum } from "../../services/StudentService";
import { AlertRequest } from "../request/AlertRequest";
import { ImportFile } from "../importFile/ImportFile";
import {CSVReader} from './ImportStudent';
import ImportHistoryStudent from "./ImportHistoryStudent";

export default function ABMStudent(){
    
    const [dni,setDni] = useState('');
    const [apellido,setApellido] = useState('');
    const [nombre,setNombre] = useState('');
    const [correo,setCorreo] = useState('');
    const [carrera,setCarrera] = useState('');
    const [showMessage,setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');
    const formRef = useRef(null);
    const formDelRef = useRef(null);

    const clear = ()=> {
       setDni('');
       setApellido('');
       setNombre('');
       setCorreo('');
       setCarrera('');
    }

    const create = ()=>{
        let alum = {
            'dni': dni,
            'apellido': apellido,
            'nombre': nombre,
            'correo': correo,
            'carrera': carrera
        }

        createAlum(alum).then((response)=>{
            clear();
            formRef.current.reset();
            if(response.status == 201 || response.status == 200){
                setMessage('Alumno creado exitosamente');
                setShowMessage(true);
                setCallError(false);
            }else{
                setMessage(response.data.error+ ": " + response.data.message);
                setShowMessage(true);
                setCallError(true);
            }
        }).catch((error)=>{
            setMessage(error.code+" : "+((error.response.data[0] !== undefined)? error.response.data[0].message : error.response.data.message));
            setShowMessage(true);
            setCallError(true);
        })
    }

    const _deleteAlum = ()=>{
     
        deleteAlum(dni).then((response)=>{
            formDelRef.current.reset();
            if(response.status == 204 || response.status == 200 || response.status == 201){
                setMessage('Alumno eliminado exitosamente');
                setShowMessage(true);
                setCallError(false);
            }else{
                setMessage(response.data.error+ ": " + response.data.message);
                setShowMessage(true);
                setCallError(true);
            }
        }).catch((error)=>{
            setMessage(error.code+" : "+((error.response.data[0] !== undefined)? error.response.data[0].message : error.response.data.message));
            setShowMessage(true);
            setCallError(true);
        })
        
    }

    return(<>   
        <br></br>
        <br></br>
        {
          showMessage?
            <><AlertRequest message={message} click={()=>{setShowMessage(false)}} show={showMessage} error={callError}></AlertRequest></>
            :
            <></>
        }

        <Container>
        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Borrar</Accordion.Header>
                <Accordion.Body>
                <Form ref={formDelRef}>
                    <Form.Group className="mb-3" controlId="dniControl">
                        <Form.Label>Nro. DNI: </Form.Label>
                        <Form.Control type="text" placeholder="Numero de Dni del alumno" onChange={(e)=>{setDni(e.target.value)}} />
                    </Form.Group>
                </Form>
                      <Button variant="outline-danger" onClick={_deleteAlum}>Borrar</Button>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Carga Masiva</Accordion.Header>
                <Accordion.Body>
                { //<ImportFile importar={importCSVCourses}></ImportFile>
}
                    <CSVReader></CSVReader>
                  </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
                <Accordion.Header>Carga Masiva - Historia Academica</Accordion.Header>
                <Accordion.Body>
                { //<ImportFile importar={importCSVCourses}></ImportFile>
}
                    <ImportHistoryStudent></ImportHistoryStudent>
                  </Accordion.Body>
            </Accordion.Item>                       
            </Accordion>

        </Container>        
    </>);

}