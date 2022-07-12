import { useRef, useState } from "react"
import { Button, Container, Form, Accordion } from "react-bootstrap";
import { createCourse, deleteCourse, importCSVCourses, importCSVCorrelatives } from "../../services/CourseService";
import { AlertRequest } from "../request/AlertRequest";
import { ImportFile } from "../importFile/ImportFile";
export default function Course(){
    
    const [carrera,setCarrera] = useState('');
    const [nombre,setNombre] = useState('');
    const [codigo,setCodigo] = useState('');
    const [showMessage,setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');
    const formRef = useRef({});

    const clear = ()=>{
        setCarrera('');
        setNombre('');
        setCodigo('');
    }

    const create = ()=>{
        let course = {
            'nombre': nombre,
            'carrera': carrera,
            'codigo': codigo
        }

        createCourse(course).then((response)=>{
            clear();
            formRef.current.reset();
            if(response.status == 201 || response.status == 200 || response.status == 204 ){
                setMessage('Materia creada exitosamente');
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

    const _deleteCourse = ()=>{
        if (window.confirm("Estas seguro que deseas borrar la materia")) {
            deleteCourse(codigo).then((response)=>{
                if(response.status == 204 || response.status == 200 || response.status == 201){
                    setMessage('Materia eliminada exitosamente');
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
    }

    return(<>   
        <br></br>
        <br></br>

        <Container>
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Crear Materia</Accordion.Header>
                <Accordion.Body>
                <Form ref={formRef}>

                    <Form.Group className="mb-3" controlId="nombControl">
                        <Form.Label>Nombre: </Form.Label>
                        <Form.Control type="text" placeholder="Nombre de la Materia" onChange={(e)=>{setNombre(e.target.value)}} />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="legControl">
                        <Form.Label>Codigo: </Form.Label>
                        <Form.Control type="text" placeholder="Codigo de la materia" onChange={(e)=>{setCodigo(e.target.value)}} />
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
                <Accordion.Header>Borrar Materia</Accordion.Header>
                <Accordion.Body>
                {
                    showMessage?
                        <><AlertRequest message={message} click={()=>{setShowMessage(false)}} show={showMessage} error={callError}></AlertRequest></>
                        :
                        <></>
                }
                <Form.Group className="mb-3" controlId="codControl">
                    <Form.Label>Codigo de Materia: </Form.Label>
                    <Form.Control type="text" placeholder="Codigo de la meteria a eliminar" onChange={(e)=>{setCodigo(e.target.value)}} />
                </Form.Group>
                    <Button variant="outline-danger" onClick={_deleteCourse}>Borrar</Button>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Carga Masiva de Materias</Accordion.Header>
                <Accordion.Body>
                <ImportFile importar={importCSVCourses}></ImportFile>
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>
        </Container>        
    </>);

}