import React, {useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import {getSubjectsComplete } from '../../services/SubjectService';
import { optionsTable } from '../../utils/table';

export default function TableSubjects({itemsPerPage}) {

    //const [subjects, setSubjects]= useState([]);
    const [items,setItems] = useState([]);

    useEffect(() => {
        getSubjectsComplete()
        .then((data) => {
            setItems(data)
        });
    },[]);

    const formatterCom = (cell)=>{
        return(cell.length == 0 ? <> <ul class="list-group"><li class="list-group-item">No Tiene </li></ul></>:
        <ul class="list-group">{
            cell.map(e=> {return(<li class="list-group-item">{e}</li>)})
            }
        </ul>);
    }

    function headerFormatter(column, colIndex, { sortElement, filterElement }) {
      return (
        <div style={ { display: 'flex', flexDirection: 'column' } }>
          { filterElement }
          { column.text }
        </div>
      );
    }

    const columns = [{
            dataField: 'nombre',
            text: 'Nombre',
            sort: true,
            classes: 'w-25 p-3',
            filter : textFilter({placeholder : " "}),
            headerFormatter: headerFormatter
            }, 
            {
            dataField: 'codigo',
            text: 'Codigo materia',
            sort: true,
            filter : textFilter({placeholder : " "}),
            headerFormatter: headerFormatter
            },
            {
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
        filter={ filterFactory()}
        striped hover condensed>
        </BootstrapTable>}
        </>);


}
