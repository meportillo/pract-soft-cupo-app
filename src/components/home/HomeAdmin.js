import React, { useEffect, useState } from "react";
import FilterRequests from "../request/FilterRequests";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import TableRequests from "../request/TableRequests";
import {getRequests, getSubjects2, getCommissions, getCommisionsBySubject} from '../../services/SubjectService';


export function HomeAdmin() {
    const [temp, setTemp] = useState([]);

    useEffect( ()=>{

        
    },[]);
    
    const clickFilters = (condition)=>{
        console.log(condition);
    };

    return(<>
        <div className="container">
            <div>
            </div>
            <hr></hr>
            <hr></hr>
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
    </>);
};