import { Form } from "react-bootstrap";
import TableSubjects from "./TableSubjects";

export default function Subjects(){
    return(
        <div className="container">
            <div>
            <Form.Label className="d-flex justify-content-center"><h3>Listado de Materias</h3></Form.Label>
            </div>
            <div className="row">
                <div className="col">
                </div>
                <div className="col-12">
                    <TableSubjects itemsPerPage={7}></TableSubjects>  
                </div>
            </div>
        </div>  
    );
}