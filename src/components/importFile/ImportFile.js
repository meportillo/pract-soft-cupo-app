import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';   
import Alert from 'react-bootstrap/Alert';    

export const ImportFile=  (props) => {
    const [file, setFile] = useState(null);
    const [error,setError] = useState(false);
    const [errorCSV, setErrorCSV] = useState(false);
    const [successImport, setSuccessImport] = useState(false);
    const [dataError, setDataError] = useState([]);
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
  
    const csvFormatoValido = (csv) => {
        const csvHeader = csv.slice(0, csv.indexOf("\n")).replace("\n","").split(",");
        return csvHeader.every((header,index) => props.formatHeader[index] == header);

    }   
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                if (csvFormatoValido(text)) {
                    const res = csvFileToArray(text);
                    props.importar(res)
                    .then(res => {
                        console.log(res);
                        setSuccessImport(true);
                    })
                    .catch(err => {
                        document.getElementById('csvFileInput').value= null;
                        setFile(null);
                        setError(null)
                        setDataError(err);
                        setErrorCSV(true);
                    }) 
                } else {
                    document.getElementById('csvFileInput').value= null;
                    setFile(null);
                    setError("el csv no respeta el formato: " + props.formatHeader.join(","));
                }
            };
            fileReader.readAsText(file);
        }else{
          setErrorCSV(null);
          setError("Debe seleccionar un CSV primero");
        }
    };
    
    const dowloadResult = () => {
        console.log(dataError)
        let csvFileData = [];  
        dataError.forEach(d => csvFileData.push(Object.values(d)))
             
        //define the heading for each row of the data  
        let csv = Object.keys(dataError[0]).join(",") + "\n";
        
        //merge the data with CSV  
        csvFileData.forEach(function(row) {  
                csv += row.join(',');  
                csv += "\n";  
        });  
    
        
        var hiddenElement = document.createElement('a');  
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
        hiddenElement.target = '_blank';  
        
        //provide the name for the CSV file to be downloaded  
        hiddenElement.download = props.filename + '.csv';  
        hiddenElement.click();  
    } 
    return (
        <div className="d-flex justify-content-center">
            <Form style={{width: '30%'}}>
            <p>Formato header: {props.formatHeader.join(",")}</p>
            {
                error 
                    ? <Alert variant="danger" onClose={() => setError(false)} dismissible>
                            {error}  
                      </Alert>
                    : <></>
            }
            {
                errorCSV 
                    ? <Alert variant="danger" onClose={() => setErrorCSV(false)} dismissible>
                          <p>Hubo un error al importar el archivo, para saber cual fue descargar el csv con el detalle de los errores.</p>
                          <Button variant="danger" onClick={dowloadResult} >
                              Descargar CSV
                          </Button>
                      </Alert>
                    : <></>
            }
            {
                successImport 
                   ? <Alert variant="success" onClose={() => setSuccessImport(false)} dismissible>
                        Importacion exitosa 
                     </Alert>
                   : <></> 
            }
            <Form.Group className="mb-3" >
                <Form.Control type="file" id={"csvFileInput"} accept={".csv"} onChange={handleOnChange}/>
            </Form.Group>
            <Button variant="primary" onClick={handleOnSubmit} >
                Importar CSV
            </Button>            
            </Form>
      </div>
    );
  }  