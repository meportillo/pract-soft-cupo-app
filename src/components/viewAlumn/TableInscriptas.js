import {horarioToString} from '../../utils/time';
import {optionsTable} from '../../utils/table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';


export default function TableInscriptas(props){
    const columns = [{
        dataField: 'nombreMateria',
        text: 'Nombre',
        sort: true,
        classes: 'w-25 p-3'
      } , {
        dataField: 'numero',
        text: 'Comision',
        sort: true
      }, {
        dataField: 'horarios',
        text: 'Horario',
        sort: true,
        style: {
          width: 'auto' 
        },
        formatter: horarioToString               
      },{
        dataField: 'cuposTotales',
        text: 'Cupos Totales',
        sort: true,
        style: {
          width: 'auto' 
        }      
     },{
        dataField: 'cuposDisponibles',
        text: 'Cupos Disponibles',
        sort: true,
        style: {
          width: 'auto' 
        }
    }];
    return(<>
        <h5 class="d-flex justify-content-center">Inscriptas en Guarani</h5>
        <BootstrapTable keyField='nombreMateria' data={ props.inscriptas } columns={ columns } pagination={ paginationFactory(optionsTable(props.inscriptas.length, 2,5)) } 
        striped hover condensed >
        </BootstrapTable>        
    </>)
} 