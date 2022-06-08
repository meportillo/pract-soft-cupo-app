import React, { useState, navigate , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';

function Items({ currentItems }) {
    const navigate = useNavigate();
    return (<>
            <Table>
                        <thead>
                            <tr key={Math.random()}>
                                <th>Codigo</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>                
                        <tbody>
                            {currentItems.map(subject => 
                                <tr key={Math.random()}>
                                    <td>{subject.codigo}</td>
                                    <td>{subject.nombre}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button key={Math.random()} onClick={ e => navigate('commissionRequest/'+subject.id)}>
                                                Ver Detalle
                                            </Button>
                                        </ButtonGroup>  
                                        </td>
                                </tr>)}
                        </tbody>                
                    </Table>          
                </>
    );
  }

function PaginatedItems({ itemsPerPage , items}) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(items);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (<>
        <Items currentItems={currentItems} />
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

export default function TableRequests(props){
     return(<>
       <br></br>
       <br></br>       
       <PaginatedItems itemsPerPage={7} items={props.requests}></PaginatedItems>
    </>)
}