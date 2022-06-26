import { Form } from "react-bootstrap";
import TableStudents from "./TableStudents";

export default function Students(){
    return(
        <div className="container">
            <div>
            <Form.Label className="d-flex justify-content-center"><h3>Busqueda de alumnos con solicitudes</h3></Form.Label>
            </div>
            <div className="row">
                <div className="col">
                </div>
                <div className="col-12">
                    <TableStudents></TableStudents>
                </div>
            </div>
        </div>  
    );
}