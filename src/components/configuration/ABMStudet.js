import { useRef, useState } from "react"
import { Button, Container, Form, Accordion } from "react-bootstrap";
import { createAlum, deleteAlum } from "../../services/StudentService";
import { AlertRequest } from "../request/AlertRequest";

export default function ABMStudent(){
    
    const [dni,setDni] = useState('');
    const [legajo,setLegajo] = useState('');
    const [apellido,setApellido] = useState('');
    const [nombre,setNombre] = useState('');
    const [coeficiente,setCoeficiente] = useState(0);
    const [correo,setCorreo] = useState('');
    const [carrera,setCarrera] = useState('');
    const [showMessage,setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');
    const formRef = useRef(null);
    const formDelRef = useRef(null);

    const clear = ()=> {
       setDni('');
       setLegajo('');
       setApellido('');
       setNombre('');
       setCoeficiente('');
       setCorreo('');
       setCarrera('');
    }

    const create = ()=>{
        let alum = {
            'dni': dni,
            'legajo':legajo,
            'apellido': apellido,
            'nombre': nombre,
            'coeficiente': coeficiente,
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
        <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Crear Alumno</Accordion.Header>
                <Accordion.Body>
                <Form ref={formRef}>

                    <Form.Group className="mb-3" controlId="dniControl">
                        <Form.Label>Nro. DNI: </Form.Label>
                        <Form.Control type="text" placeholder="Numero de Dni del alumno" onChange={(e)=>{setDni(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="legControl">
                        <Form.Label>Legajo: </Form.Label>
                        <Form.Control type="text" placeholder="Numero de Legajo del alumno" onChange={(e)=>{setLegajo(e.target.value)}} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="nombControl">
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control type="text" placeholder="Nombre del alumno" onChange={(e)=>{setNombre(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="apeControl">
                        <Form.Label>Apellido: </Form.Label>
                        <Form.Control type="text" placeholder="Apellido del alumno" onChange={(e)=>{setApellido(e.target.value)}} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="coeControl">
                        <Form.Label>Coeficiente: </Form.Label>
                        <Form.Control type="text" placeholder="Coeficiente del alumno" onChange={(e)=>{setCoeficiente(e.target.value)}} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email </Form.Label>
                        <Form.Control type="email" placeholder="Email del alumno"  onChange={(e)=>{setCorreo(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Carrera </Form.Label>

                        <Form.Select aria-label="Carrera" onChange={(e)=>{setCarrera(e.target.value)}} >
                            <option>Selecionar</option>
                            <option value="TPI">Tecnicatura universitaria en Programacion Informatica</option>
                            <option value="LI">Licenciatura en informatica</option>
                            <option value="SIMULTANEIDAD">Simultaneidad</option>
                        </Form.Select>
                    </Form.Group>


                    </Form>
                    <Button variant="outline-primary" onClick={create}>Crear</Button>

                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Borrar Alumno</Accordion.Header>
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
            </Accordion>

        </Container>        
    </>);

}