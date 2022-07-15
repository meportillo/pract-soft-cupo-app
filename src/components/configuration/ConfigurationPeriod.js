import { Form } from "react-bootstrap";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ConfigurationDate } from "./ConfigurationDate";
import ABMStudent from "./ABMStudent";
import Course from "./Course";

export default function ConfigurationPeriod(){
    return(<>
            <Form.Label className="d-flex justify-content-center"><h3>Editar periodo del cuatrimestre</h3></Form.Label>
            <div className="container">
                <div className="row">
                    <div className="col">

                    </div>
                    <div className="col-12">
                        <br></br>
                        {/* <Tabs defaultActiveKey="abm-cuatrimestre" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="abm-cuatrimestre" title="Cuatrimestre"> */}
                                <ConfigurationDate></ConfigurationDate>
                            {/* </Tab>
                        </Tabs> */}
                    </div>
                </div>
            </div>
    </>);
}