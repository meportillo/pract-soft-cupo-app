import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';   
import Alert from 'react-bootstrap/Alert';    

// export const ImportFile = () => {
//     return (
//         <Form >
//             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label>Importar CSV materias</Form.Label>
//                 <Form.Control type="file"/>
//             </Form.Group>
//         </Form>
//     )
// }
export const ImportFile=  () => {
    const [file, setFile] = useState(null);
    const [error,setError] = useState(false);

    const fileReader = new FileReader();
  
    const handleOnChange = (e) => {
      setFile(e.target.files[0]);
    };
    const csvFileToArray = string => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).replaceAll("\r","").split("\n");
      const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
      return array;
    };
  
    const handleOnSubmit = (e) => {
      e.preventDefault();
  
      if (file) {
        fileReader.onload = function (event) {
          const text = event.target.result;
          const res = csvFileToArray(text);
          console.log(res)
        };
        fileReader.readAsText(file);
      }else{
        setError(true)
      }
    };
    
    const dowloadResult = () => {
        var csvFileData = [  
            ['Alan Walker', 'Singer'],  
            ['Cristiano Ronaldo', 'Footballer'],  
            ['Saina Nehwal', 'Badminton Player'],  
            ['Arijit Singh', 'Singer'],  
            ['Terence Lewis', 'Dancer']  
         ];  
             
    //create a user-defined function to download CSV file   

    
        //define the heading for each row of the data  
        var csv = 'Name,Profession\n';  
        
        //merge the data with CSV  
        csvFileData.forEach(function(row) {  
                csv += row.join(',');  
                csv += "\n";  
        });  
    
        
        var hiddenElement = document.createElement('a');  
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
        hiddenElement.target = '_blank';  
        
        //provide the name for the CSV file to be downloaded  
        hiddenElement.download = 'ArchivoSubido.csv';  
        hiddenElement.click();  
    } 
    return (
        <div className="d-flex justify-content-center">
            <Form style={{width: '30%'}}>
            {
                error 
                    ? <Alert variant="danger" onClose={() => setError(false)} dismissible>
                            Debe subir primero un CSV antes de enviarlo  
                      </Alert>
                    : <></>
            }
            <Form.Group className="mb-3" >
                <Form.Label>Importar CSV materias</Form.Label>
                <Form.Control type="file" id={"csvFileInput"} accept={".csv"} onChange={handleOnChange}/>
            </Form.Group>
            <Button variant="primary" onClick={handleOnSubmit} style={{width: '30%'}}>
                Importar CSV
            </Button>            
            <Button variant="primary" onClick={dowloadResult} style={{width: '30%'}}>
                Descargar CSV
            </Button>
            </Form>
      </div>
    );
  }  