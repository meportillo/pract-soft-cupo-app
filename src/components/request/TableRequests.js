import React, { useState, navigate , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {getRequests, getSubjects2, getCommissions, getCommisionsBySubject} from '../../services/SubjectService';



export default function TableRequests({itemsPerPage}) {
        const navigate = useNavigate();
        const [items,setItems] = useState([]);
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [first, setFirst] = useState(true);
        const [itemOffset, setItemOffset] = useState(0);

        useEffect(()=>{
         
            getSubjects2().then(subjectTable => {
                let materias = [];     
                    subjectTable.forEach(mat => {
                        const data = getCommisionsBySubject(mat.codigo)
                        .then((response) =>{
                            let obj = mat;
                            obj.comisiones= response;
                            return obj
                        });
                        materias.push(data)
                    });
                    Promise.all(materias)
                    .then(promises => setItems(promises));
                   
        })},[]);

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
        return (<>
            <Table bordered>
                        <thead>
                            <tr key={Math.random()}>
                                <th>Nombre</th>
                                <th>Comisiones</th>
                            </tr>
                        </thead>                
                        <tbody>
                            {currentItems && currentItems.map(subject => 
                               <> <tr key={Math.random()}>
                                    <td>{subject.nombre}</td>
                                    <td>
                                    <Table bordered>
                                    <thead>
                                        <tr key={Math.random()}>
                                            <th>Nro</th>
                                            <th>Disponibles</th>
                                            <th>Totales</th>
                                            <th>Acciones</th>

                                        </tr>
                                    </thead>   
                                                <tbody>

                                        {
                                        subject.comisiones.length == 0?
                                        <> 
                                                    <tr>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td>-</td>
                                                        <td> No
                                                        </td>
                                                    </tr>             
                                        </> 
                                        :<>
                                           {subject.comisiones.map(com=>{
                                               return <>
                                                        <tr>
                                                            <td>{com.numero}</td>
                                                            <td>{com.cuposDisponibles}</td>
                                                            <td>{com.cuposTotales}</td>
                                                            <td>
                                                            <ButtonGroup>
                                                                <Button key={Math.random()} onClick={ e => navigate('commissionRequest/'+com.id)}>
                                                                    Ver
                                                                </Button>
                                                            </ButtonGroup>  
                                                            </td>
                                                      </tr>
                                                    </>
                                                })}
                                        </>}
                                            </tbody>
                                            </Table>

                                    </td>
                                </tr></>)}
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
        </>);

  }

