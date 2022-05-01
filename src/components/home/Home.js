import React from "react";
import FilterRequests from "../request/FilterRequests";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';

export default class Home extends React.Component {
    render(){
        return(<>
            <div className="container">
                <div>
                    HOME: suponemos que esta logueado un director
                </div>
                <hr></hr>
                <hr></hr>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Filtrar Solicitudes</Accordion.Header>
                        <Accordion.Body>
                        <FilterRequests></FilterRequests>
                          </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>    
            </>
        );
    };
}