import React, { useEffect, useState } from "react";
import FilterRequests from "../request/FilterRequests";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import TableRequests from "../request/TableRequests";
import {getRequests, getSubjects2, getCommissions, getCommisionsBySubject} from '../../services/SubjectService';
import Form from 'react-bootstrap/Form';


export function HomeAdmin(props) {
    const [temp, setTemp] = useState([]);

    useEffect( ()=>{

        
    },[]);
    
    const clickFilters = (condition)=>{
        console.log(condition);
    };

    return(<>
        <div className="container">
            <div>
            <Form.Label className="d-flex justify-content-center"><h3>Materias con solicitudes de cupos</h3></Form.Label>
            </div>
            <div className="row">
                <div className="col">
                </div>
                <div className="col-12">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Filtrar Comisiones</Accordion.Header>
                            <Accordion.Body>
                            <FilterRequests onClickFilter={clickFilters}></FilterRequests>
                                </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <TableRequests itemsPerPage={7}>
                    </TableRequests>
                </div>
            </div>
        </div>    
    </>);
};