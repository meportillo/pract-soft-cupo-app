import { Form } from "react-bootstrap";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ABMStudent from "./ABMStudet";
import Course from "./Course";

export default function Configuration(){
    return(<>
            <Form.Label className="d-flex justify-content-center"><h3>Configuraciones</h3></Form.Label>
            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col-12">
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="abm-student" title="Alumnos">
                                <ABMStudent></ABMStudent>
                            </Tab>
                            <Tab eventKey="abm-materias" title="Materias">
                                <Course></Course>
                            </Tab>
                            <Tab eventKey="abm-cuatrimestre" title="Cuatrimestre">

                            </Tab>
                            <Tab eventKey="masivas" title="Cargas Masivas">
                                
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
    </>);
}