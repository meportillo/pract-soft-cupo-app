import React, { Component, useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Form, Row, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni, getSubjectsComplete } from '../../services/SubjectService';

export default function TableSubjects({itemsPerPage}) {

    //const [subjects, setSubjects]= useState([]);
    const [items,setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [first, setFirst] = useState(true);

    useEffect(() => {
        getSubjectsComplete()
        .then((data) => {
            setItems(data)
        });
    },[])

    useEffect(() => {
        // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
            setFirst(false);
        }, [itemOffset, itemsPerPage, items]);
  
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
        };
        const handlePageClickInit = (nro) => {
            const newOffset = (nro * itemsPerPage) % items.length;
            setItemOffset(newOffset);
        };

    return (
      <>
        <Table striped bordered hover className="Alumnos">
          <thead>
            <tr key={Math.random()}>
              <th>Nombre</th>
              <th>Codigo materia</th>
              <th>Carrera</th>
              <th>Correlativas</th>
            </tr>
          </thead>
          <tbody>
            {currentItems && currentItems.map(({codigo,nombre,carrera,correlativas}) =>
            <>
                <tr key={codigo}>
                      <td>{nombre}</td>
                      <td>{codigo}</td>
                      <td>{carrera}</td>
                      <td>
                        <Table size='sm' striped bordered hover responsive='sm'>
                            <thead>
                            <tr key={Math.random()}>
                                <th>Nombre</th>
                            </tr>
                            </thead>
                            <tbody>
                                {correlativas.length == 0 ?
                                    <> 
                                        <tr>
                                            <td>No tiene</td>
                                        </tr>             
                                    </> 
                                    :
                                    <>
                                        {correlativas.map(mat =>
                                        <>
                                            <tr>
                                                <th>{mat}</th>
                                            </tr>
                                        </>
                                        )}
                                    </>
                                }
                            </tbody>
                        </Table>
                      </td>
                </tr>
            </>
            )}
          </tbody>
        </Table>
        <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< "
            renderOnZeroPageCount={null}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}          
            />
      </>
    );


}
