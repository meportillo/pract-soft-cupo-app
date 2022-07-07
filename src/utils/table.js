const optionsTable = (length, cant1, cant2 )=>{

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
           {' '} Mostrando { from } hasta { to } de { size } Elementos
        </span>
      )
    return({
        paginationSize: 4,
        pageStartIndex: 0,
        firstPageText: 'Primero',
        prePageText: 'Anterior',
        nextPageText: 'Proximo',
        lastPageText: 'Ultimo',
        nextPageTitle: '1a Pagina',
        prePageTitle: 'Anterior',
        firstPageTitle: 'Proxima',
        lastPageTitle: 'Ultima',
        showTotal: true,
        paginationTotalRenderer: customTotal,
        disablePageTitle: true,
        sizePerPageList: [{
          text: cant1.toString(), value: cant1
        }, {
          text: cant2.toString(), value: cant2
        }, {
          text: 'Todos', value: length
        }] // A numeric array is also available. the purpose of above example is custom the text
      });
}
export {optionsTable}