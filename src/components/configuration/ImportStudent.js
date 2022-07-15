import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { usePapaParse } from 'react-papaparse';
import {FcCancel} from  "react-icons/fc";
import {  Button, Card } from 'react-bootstrap';
import { createAlums } from '../../services/StudentService';
import { AlertRequest } from '../request/AlertRequest';
import { useCSVDownloader } from 'react-papaparse';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


const styles = {
    csvReader: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
    } ,
    browseFile: {
      width: '20%',
    } ,
    acceptedFile: {
      border: '1px solid #ccc',
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: '80%',
    },
    remove: {
      borderRadius: 0,
      padding: '10px',
      backgroundColor: 'white'
    },
    progressBarBackgroundColor: {
      backgroundColor: 'red',
    },
  };
  

 const CSVReader = ()=> {
    const { CSVReader } = useCSVReader();
    const [alumnos,setAlumnos] = useState([]);
    const [isOkToUpload, setIsOkToUpload] = useState(false);
    const { jsonToCSV } = usePapaParse();
    const [showMessage,setShowMessage] = useState(false);
    const [showDescarga,setDescarga] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');
    const { CSVDownloader, Type } = useCSVDownloader();
    const [resultadoProceso, setResultadoProceso] = useState([]);
    const [showSpiner, setShowSpiner] = useState(false);

    const sendFileStudent = (clear)=>{
        setShowSpiner(true);
        setIsOkToUpload(false);
        createAlums(alumnos)
        .then(response=>{
            clear();
            setShowSpiner(false);
            console.log(response);
            if(response.status !== 201){
                const results = jsonToCSV(response.data);
                console.log('---------------------------');
                console.log('Results: TO CSV', results);
                console.log('---------------------------');

            }else {
                console.log('alumnos cargados correctamente');
                setMessage('Carga Masiva de Alumnos Exitosa');
                setShowMessage(true);
                setCallError(false);                
            }
            
        })
        .catch(error=>{
            clear();
            setShowSpiner(false);
            console.log(error);
            const results = jsonToCSV(error.response.data);
            setResultadoProceso(results);
            setDescarga(true);
            console.log('---------------------------');
            console.log('Results: TO CSV', results);
            console.log('---------------------------');            
        })
    }

    let alumnosExample = [
        {
            'Apellido':'Gonzalez',
            'Nombre':'Celia',
            'Documento':'701584',
            'Propuesta':'W','Plan':'2012',
            'Estado Inscr.':'Aceptado',
            'Calidad':'Pasivo',
            'Regular':'N',
            'Locación':'Bernal'
        }
    ];

    let fun_;

    return (
        <>


        <Card>
            <Card.Header>
                Formato CSV 
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Formato del Header: Código,Actividad,Comisión,Modalidad,Ubicacion,Banda Horaria y Aula
                </Card.Text>
                <Card.Text> Formato de las Filas : 80005,	Elementos de Programación y Lógica,	80005-B1-CYT2 (Presencial),	Presencial,	Berazategui,	Lun 18:00 a 19:59 - Teórica / Mie 18:00 a 19:59 - Teórica</Card.Text>
                <CSVDownloader
                type={Type.Button}
                filename={'filename'}
                bom={true}
                config={{
                    delimiter: ',',
                }}
                data={
                    alumnosExample
                }
                >
                Descargar Ejemplo CSV
                </CSVDownloader>            
            </Card.Body>
          </Card>
        <CSVReader
        config={
                {
                    skipEmptyLines: 'greedy',
                    header:true,
                }
            }
            onUploadAccepted={(results) => {
            setAlumnos([]);
            console.log('---------------------------');
            console.log(results);

            Promise.all(results.data).then((alumsRes)=>{
            let alumnosTemp = [];

           let fila = 1;
            alumsRes.map(elem=>{
                let alum = {
                    'apellido': elem.Apellido === undefined? '':elem.Apellido ,
                    'propuesta': elem.Propuesta === undefined? '': elem.Propuesta,
                    'dni': elem.Documento === undefined? '': elem.Documento,
                    'nombre': elem.Nombre === undefined? '': elem.Nombre,
                    'plan': elem.Plan === undefined? '': elem.Plan,
                    'estado': elem['Estado Inscr.'] === undefined? '': elem['Estado Inscr.'],
                    'locacion': elem['Locación'] === undefined? '': elem['Locación'],
                    'regular':elem.Regular === undefined? '': elem.Regular,
                    'calidad':elem.Calidad === undefined? '': elem.Calidad,
                    'fila': fila 

                }
                fila+=1
                alumnosTemp.push(alum);
            });
                Promise.all(alumnosTemp)
                .then(promises =>{ 
                    setAlumnos(promises);
                    setIsOkToUpload(true);
                });
                console.log(alumnos);
                console.log('---------------------------');
            });
        }}>
        
            {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            }) => (
            <>
                {fun_ = getRemoveFileProps}
                <div style={styles.csvReader}>
                <button type='button' {...getRootProps()} style={styles.browseFile}>
                    Importar Archivo
                </button>
                <div style={styles.acceptedFile}>
                    {acceptedFile && acceptedFile.name}
                </div>
                <button {...getRemoveFileProps()} style={styles.remove}>
                    <FcCancel></FcCancel>
                </button>
                </div>
                <ProgressBar style={styles.progressBarBackgroundColor} />
            </>
            )}
        </CSVReader>
      <Button onClick={(e)=> sendFileStudent(fun_)} disabled={!isOkToUpload}>Enviar Archivo</Button>
      {
          showMessage?
            <><AlertRequest message={message} click={()=>{setShowMessage(false)}} show={showMessage} error={callError}></AlertRequest></>
            :
            <></>
        }
        {
            showSpiner?  <Spinner animation="border" >.:.</Spinner>:<></>
        }      
        {
          showDescarga?
            <> {' '}
                <Alert key='warning' variant='warning' dismissible onClick={(e)=>{setDescarga(false)}}>
                   Hay conflictos con la importacion.
                </Alert>
                {' '}
                <CSVDownloader
                type={Type.Button}
                filename={'filename'}
                bom={true}
                config={{
                    delimiter: ',',
                }}
                data={
                    resultadoProceso
                }
                style={{backgroundColor: '#d6cca1'}}
                >
                Descargar
                </CSVDownloader>
            </>:
            <></>
        }
      </>);

}
export {CSVReader}