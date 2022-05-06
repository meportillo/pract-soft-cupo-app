import React, { useEffect, useState } from "react";
import FilterRequests from "../request/FilterRequests";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import TableRequests from "../request/TableRequests";
import {getRequests} from '../../services/SubjectService';

export default function Home() {
    const [requestsTable, setRequestsTable] = useState([]);

    useEffect(()=>{
        getRequests.then( response => {
            console.log(response);
            setRequestsTable(response);
        }).catch(e => console.error(e))
    },[])

    const clickFilters = (condition)=>{
        console.log(condition);
    };
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
                    <FilterRequests onClickFilter={clickFilters}></FilterRequests>
                        </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <TableRequests requests={requestsTable}>
            </TableRequests>
        </div>    
    </>);
    };
