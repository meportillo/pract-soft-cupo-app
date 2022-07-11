import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Container } from "react-bootstrap";
import {getRequestsByCommision} from '../../services/SubjectService';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { optionsTable } from "../../utils/table";
import { getAlumByDni } from "../../services/StudentService";

export default function CommissionRequest(props){
    const location = useLocation();
    const {nombreMateria,comisionId} = location.state;
    const [requests, setRequests] = useState([]);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    let { idcomision } = useParams();

    useEffect(()=>{
        getRequestsByCommision(idcomision, setRequests)
        .then(response => {
          console.log('response: ',response);
          let temp = [];
          response.data.map(req =>{
            const reqAl = getAlumByDni(req.dni).then(response=>{
              console.log('alumno', response);
              let obj = req;
              obj.alumno = response.data.length == 1 ? response.data[0]: undefined;
              return obj
            });
            temp.push(reqAl);
          });
          Promise.all(temp)
          .then(promises => setItems(promises));

        });
        console.log(items);
    },[])

    const actions = (dni)=>{
        return(<>
            <ButtonGroup>
                <Button key={Math.random()} onClick={ e => navigate('/student/'+dni)}>
                    Ver Detalle
                </Button>
            </ButtonGroup>        
        </>
        );  
    } 

    const columns = [{
        dataField: 'dni',
        text: 'DNI',
        sort: true,
        classes: 'w-25 p-3'
      },{
        dataField: 'alumno.legajo',
        text: 'Legajo',
        sort: true,
        classes: 'w-25 p-3'
      },{
        dataField: 'alumno.coeficiente',
        text: 'Coeficiente',
        sort: true,
        classes: 'w-25 p-3'
      },{
        //coeficiente
        dataField: 'cantidadDeAprobadas',
        text: 'Comision',
        sort: true
      },{
        dataField: 'dni',
        text: 'Acciones',
        sort: true,
        style: {
          width: 'auto' 
        },
        formatter: actions        
      }]

    return (<>
        <h3 style={{textAlign:"center"}}>{`Alumnos solicitantes para la Comision ${comisionId} de ${nombreMateria}`}</h3>

        <Container style={{'float': 'right'}}>
                <BootstrapTable keyField='nombre' data={ items }  pagination={ paginationFactory(optionsTable(requests.length, 5,10))}  columns={ columns } 
                striped hover condensed>
                </BootstrapTable>
        </Container>
    </>);
}