import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {optionsTable} from '../../utils/table';

export default function TableMateria({materias}){

    const columns = [{
        dataField: 'nombreMateria',
        text: 'Nombre',
        sort: true,
        classes: 'w-25 p-3'        
      } , {
        dataField: 'estado',
        text: 'Nota',
        sort: true
      }, {
        dataField: 'fechaDeCarga',
        text: 'Fecha',
        sort: true,
        style: {
          width: 'auto' 
        }        
      },{
        dataField: 'cantidadDeVecesCursada',
        text: 'Veces Cursada',
        sort: true,
        style: {
          width: 'auto' 
        }      
      }];

    return(
        <>        
        <h5 class="d-flex justify-content-center">Materias Cursadas</h5>
        <BootstrapTable keyField='nombreMateria' data={ materias } columns={ columns } pagination={ paginationFactory(optionsTable(materias.length,2,5)) }  
        striped hover condensed >
        </BootstrapTable>
        </>
    );
}