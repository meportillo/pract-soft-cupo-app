import React, { useEffect, useState } from "react";
import { getRequestsOfStudent } from '../../services/AlumnService';
import { Navbar } from "../navigation/NavBar";
import Table from 'react-bootstrap/Table';

export default function Home() {
    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        getRequestsOfStudent(user.dni)
        .then(data => {
            setSolicitudes(data.formulario.solicitudes)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    return(
        <div>
            <Navbar></Navbar>
        <div className="container">
            <h1 className="d-flex justify-content-center mb-3">Solicitudes</h1>
            {
                solicitudes.length === 0
                    ? <div>No hay Solicitudes cargadas</div>
                    : <TableRequestsStudent solicitudes={solicitudes}/>
            }
        </div>    
        </div>
    )
};

const TableRequestsStudent = (props) => {
    return (
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>id</th>
            <th>Estado</th>
            <th>Comision Id </th>
            </tr>
        </thead>
        <tbody>
            {
                props.solicitudes.map((sol,index) => {
                   return (
                        <tr key={index}>
                        <td>{sol.id}</td>
                        <td>{sol.estado}</td>
                        <td>{sol.comisionId}</td>
                        </tr>
                    )
                })
            }
        </tbody>
        </Table>
    )
}