import React, { Component, useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Form, Row, Table } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactPaginate from 'react-paginate';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAlumnos, getAlumnosByDni, getSubjectsComplete } from '../../services/SubjectService';
import { optionsTable } from '../../utils/table';

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
    },[]);

    useEffect(() => {
        // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
            setFirst(false);
    }, [itemOffset, itemsPerPage, items]);

    const formatterCom = (cell)=>{
        return(cell.length == 0 ? <> <ul class="list-group"><li class="list-group-item">No Tiene </li></ul></>:
        <ul class="list-group">{
            cell.map(e=> {return(<li class="list-group-item">{e}</li>)})
            }
        </ul>);
    }

    const columns = [{
            dataField: 'nombre',
            text: 'Nombre',
            sort: true,
            classes: 'w-25 p-3'
          } , {
            dataField: 'codigo',
            text: 'Codigo materia',
            sort: true
          }, {
            dataField: 'carrera',
            text: 'Carrera',
            sort: true,
            style: {
              width: 'auto' 
            }        
          },
          {
            dataField: 'correlativas',
            text: 'Correlativas',
            sort: true,
            formatter:  formatterCom   
          }
        ]; 

    return (<>
        {items === null || items === undefined ? <></>:
        <BootstrapTable keyField='nombre' data={ items }  pagination={ paginationFactory(optionsTable(items.length, 5,10))}  columns={ columns } 
        striped hover condensed>
        </BootstrapTable>}
        </>);


}
