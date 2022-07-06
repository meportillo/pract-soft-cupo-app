import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'

export default function TableMateria({materias}){
    return(
        <>
        
        <h5 class="d-flex justify-content-center">Materias Cursadas</h5>
        <Table striped hover className='Aprobadas table-responsive'>
            <tbody className='overflow-auto'>
                <tr>
                    <td>Nombre</td>
                    <td>Nota</td>
                    <td>Fecha</td>
                    <td>Veces cursada</td>
                </tr>
                {
                    materias.map(mat => {
                        return(
                        <tr key={mat.nombreMateria}>
                            <td>{mat.nombreMateria}</td>
                            <td>{mat.estado}</td>
                            <td>{mat.fechaDeCarga}</td>
                            <td>{mat.cantidadDeVecesCursada}</td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
        </>
    );
}