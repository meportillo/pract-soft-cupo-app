import { useRef, useState } from "react"
import { Button, Container, Form, Accordion } from "react-bootstrap";
import { createCourse, deleteCourse, importCSVCourses } from "../../services/CourseService";
import { AlertRequest } from "../request/AlertRequest";
import { ImportFile } from "../importFile/ImportFile";
export default function Course(){
    
    const [codigo,setCodigo] = useState('');
    const [showMessage,setShowMessage] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');

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
            <Accordion.Item eventKey="1">
                <Accordion.Header>Carga Masiva de Materias</Accordion.Header>
                <Accordion.Body>
                <ImportFile importar={importCSVCourses}></ImportFile>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
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
            </Accordion>
        </Container>        
    </>);

}