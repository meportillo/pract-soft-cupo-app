import React, { useEffect, useState } from "react";
import FilterRequests from "../request/FilterRequests";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import TableRequests from "../request/TableRequests";
import {getCommissions} from '../../services/SubjectService';


export default function Home() {
    const [requestsTable, setRequestsTable] = useState([]);

    useEffect(()=>{
     getCommissions('2022','S1', setRequestsTable);
    },[])

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
            <TableRequests requests={requestsTable}>
            </TableRequests>
        </div>    
    </>);
    };
