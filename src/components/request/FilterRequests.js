import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

export default function FilterRequests(props){

    return(<>
    <Form.Group className='container'>
        <Form.Group className="row">
            <Form.Label className="col">Año: 
                <Form.Select aria-label="Default select example">
                    <option>Seleccionar Ciclo Lectivo</option>
                    {// Aca deberia recibir una lista de cilclos lectivos a traves de props
                    }
                    {['2022','2021','2020','2019'].map(e => <option key={e} value={e}>{e}</option>)}
                </Form.Select>  
            </Form.Label>            
            <Form.Label className="col">Carrera: 
                <Form.Select aria-label="Default select example">
                    <option>Seleccionar Carrera</option>
                    {// Aca deberia recibir una lista de carreras lectivos a traves de props
                    }
                    {['Tecnicatura Universitaria en Programacion Informatica','Licenciatura en Informatica','Licenciatura en Bioinformatica'].map(e => <option key={e} value={e}>{e}</option>)}
                </Form.Select>  
            </Form.Label>            
        </Form.Group>
        <Form.Group>
            <Form.Label>Estado de solicidudes: </Form.Label>
                    {// Aca deberia recibir una lista de estados lectivos a traves de props
                    }
            <Form.Check
                inline
                label="Abiertas"
                name="solStateOpen"
                type="checkbox"
                id={`inline-checkbox-1`}/>
            <Form.Check
                inline
                label="Cerradas"
                name="solStateClosed"
                type="checkbox"
                id={`inline-checkbox-2`}/>
            <Form.Check
                inline
                label="Aceptada"
                name="solStateClosed"
                type="checkbox"
                id={`inline-checkbox-3`}/>
            <Form.Check
                inline
                label="Rechazada"
                name="solStateClosed"
                type="checkbox"
                id={`inline-checkbox-4`}/>
        </Form.Group>
        <br></br>
        <Form.Group>
            <Form.Label>Cuatrimestre: </Form.Label>
            <Form.Check
                inline
                label="Primer"
                name="fstCuatri"
                type="checkbox"
                id={`inline-checkbox-5`}/>
            <Form.Check
                inline
                label="Segundo"
                name="snCuatri"
                type="checkbox"
                id={`inline-checkbox-6`}/>
        </Form.Group>
        <Form.Group >
            <Form.Label>
                Datos del Alumno:
            </Form.Label>
            <Form.Group className="row justify-content-md-center">
                <Form.Label className="col">
                    Legajo: 
                    <Form.Control type="text" placeholder="Legajo" />
                </Form.Label>
                <Form.Label className="col">
                    Dni: 
                    <Form.Control  type="text" placeholder="Dni" />
                </Form.Label>
            </Form.Group>
            <Form.Group className="row">
            </Form.Group>
        </Form.Group>
        <Form.Group className="row">
            <div className="col "></div>
            <div className="col "></div>
            <Button  className="col order-last"variant="primary">Filtar</Button>{' '}
        </Form.Group>
    </Form.Group>
    </>)
}