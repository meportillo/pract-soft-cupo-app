import React, { useState, navigate , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {getRequests, getSubjects2, getCommissions, getCommisionsBySubject} from '../../services/SubjectService';
import Form from 'react-bootstrap/Form';
import { optionsTable } from '../../utils/table';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';



export default function TableRequests({itemsPerPage}) {
        const navigate = useNavigate();
        const [items,setItems] = useState([]);
        const [currentItems, setCurrentItems] = useState(null);
        const [pageCount, setPageCount] = useState(0);
        const [first, setFirst] = useState(true);
        const [itemOffset, setItemOffset] = useState(0);
        const [search, setSearch] = useState("");
        const getMaterias = (nombre) => {
            getSubjects2(nombre).then(subjectTable => {
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
            })
        };

        useEffect(getMaterias,[]);

        useEffect(() => {
        // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
            setFirst(false);
        }, [itemOffset, itemsPerPage, items]);


        const sendSearch = () => {
           getMaterias(search)
        }

        const actionsCommisions = (com,subject)=>{
            return(<><ButtonGroup>
                            <Button key={Math.random()} onClick={ e => navigate(`commissionRequest/${com}`,{state:{nombreMateria:subject.nombre,comisionId:com.numero}})}>
                            Ver
                            </Button>
                        </ButtonGroup></>)
        }

        const columnsComisions = [{
            dataField: 'numero',
            text: 'Nro',
            sort: true,
            classes: 'w-25 p-3'
          } , {
            dataField: 'cuposDisponibles',
            text: 'Disponibles',
            sort: true
          }, {
            dataField: 'cuposTotales',
            text: 'Totales',
            sort: true,
            style: {
              width: 'auto' 
            }        
          },
          {
            dataField: 'id',
            text: 'Acciones',
            sort: true,
            formatter:  actionsCommisions   
          }
        ];

        const formatterCom = (cell)=>{
            return(<>
            <BootstrapTable keyField='nombreMateria' data={ cell } columns={ columnsComisions } >
                </BootstrapTable>
            </>)
        }
        const columnsSubjects = [{
            dataField: 'nombre',
            text: 'Nombre',
            sort: true,
            classes: 'w-25 p-3'
          } , {
            dataField: 'comisiones',
            text: 'Comisiones',
            sort: true,
            formatter: formatterCom
          }];



        return(<>
        <Form>
        <Row className="mb-3">
            <Col md="auto" style={{"margin-block-start": "auto"}}>
                <Form.Label>Buscar por nombre</Form.Label>
            </Col>
            <Col>
                <Form.Control placeholder="Introduzca una materia" onChange={(e) => setSearch(e.target.value)} />
            </Col>
            <Button as={Col} md="auto" variant="primary" onClick={sendSearch}>Buscar</Button>
        </Row>
        </Form>
        {currentItems === undefined || currentItems === null ? <></>:
        <BootstrapTable keyField='nombre' data={ currentItems }  pagination={ paginationFactory(optionsTable(currentItems.length, 5,10))}  columns={ columnsSubjects } 
        striped hover condensed>
        </BootstrapTable>}
        </>);

  }

