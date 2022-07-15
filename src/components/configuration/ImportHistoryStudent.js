import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { usePapaParse } from 'react-papaparse';
import {FcCancel} from  "react-icons/fc";
import {  Button, Card } from 'react-bootstrap';
import { createAlums, updateHistory } from '../../services/StudentService';
import { AlertRequest } from '../request/AlertRequest';
import { useCSVDownloader } from 'react-papaparse';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


export default function ImportHistoryStudent(){
    const { CSVReader } = useCSVReader();
    const [historia,setHistoria] = useState([]);
    const [isOkToUpload, setIsOkToUpload] = useState(false);
    const { jsonToCSV } = usePapaParse();
    const [showMessage,setShowMessage] = useState(false);
    const [showDescarga,setDescarga] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');
    const { CSVDownloader, Type } = useCSVDownloader();
    const [resultadoProceso, setResultadoProceso] = useState([]);
    const [showSpiner, setShowSpiner] = useState(false);

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

      const sendFileStudent = ()=>{
        setShowSpiner(true);
        updateHistory(historia)
        .then(response=>{
          setShowSpiner(false);          
            console.log(response);
            if(response.status !== 201 && response.status !== 200){
                const results = jsonToCSV(response.data);
                console.log('---------------------------');
                console.log('Results: TO CSV', results);
                console.log('---------------------------');

            }else {
                console.log('alumnos cargados correctamente');
                setMessage('Carga Masiva de Historia Academica Exitosa');
                setShowMessage(true);
                setCallError(false);                
            }
            
        })
        .catch(error=>{
            setShowSpiner(false);
            console.log(error);
            const results = jsonToCSV(error.response.data);
            setResultadoProceso(results);
            setDescarga(true);
            console.log('---------------------------');
          //  console.log('Results: TO CSV', results);
            console.log('---------------------------');            
        })
    }

    const historyExample = [{
        'Legajo':'10380','DNI':'DNI 12345677',
        'Carrera':'W','Materia':'80005',
        'Nombre':'ELEMENTOS DE PROG. Y LÓGICA',
        'Fecha':'07/02/2019',
        'Resultado':'P',
        'Nota':'7',
        'Forma Aprobación':'Promoción en otra carrera',
        'Crédito':'10','Acta_Promo':'39569','Acta_examen':'','Plan':'2015'
    }]

    const replaceZero = (st)=>{
        let rec = st;
        let pos = 0;
        console.log(st.charAt(pos)==='0');
        while(st.charAt(pos)==='0'){
            console.log(st.charAt(pos))
            rec=rec.replace('0', '');
            console.log(rec);
            pos+=1;
        }
        return rec;
       
    }

      return (
        <>
          <Card>
            <Card.Header>
                Formato CSV 
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Formato del Header: Legajo,DNI,Carrera,Materia,Nombre,Fecha,Resultado,Nota,Forma Aprobación,Crédito,Acta_Promo,Acta_examen,Plan 
                </Card.Text>
                <Card.Text> Formato de las Filas : 10380,DNI 12345677,W,80005,ELEMENTOS DE PROG. Y LÓGICA,07/02/2019,P,7,Promoción en otra carrera,10,39569,39658,2015</Card.Text>
                <CSVDownloader
                type={Type.Button}
                filename={'ejemplo'}
                bom={true}
                config={{
                    delimiter: ',',
                }}
                data={
                    historyExample
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
            setHistoria([]);
            console.log('---------------------------');
            console.log(results);

            Promise.all(results.data).then((historiaRes)=>{
            let historiaTemp = [];

           let fila = 1;
           historiaRes.map(elem=>{
                let fecha = elem.Fecha.split('/');
                let cursada = {
                    'codigo': elem.Materia === undefined? '':replaceZero(elem.Materia), // hay que sacar el cero de adelante.
                    'dni': elem.DNI === undefined? '': elem.DNI.split(' ')[1],
                    'fecha': elem.Fecha ===  undefined? '': fecha[2]+'-'+fecha[1]+'-'+fecha[0],
                    'fila': fila,
                    'resultado': elem.Resultado ===  undefined?'':elem.Resultado === 'A'||elem.Resultado === 'P'||elem.Resultado === 'U'?'APROBADO':elem.Resultado === 'E'? 'PA': 'DESAPROBADO'

                }
                fila+=1
                historiaTemp.push(cursada);
            });
                Promise.all(historiaTemp)
                .then(promises =>{ 
                    setHistoria(promises);
                    setIsOkToUpload(true);
                });
                console.log(historia);
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
      <Button onClick={(e)=> sendFileStudent()} disabled={!isOkToUpload}>Enviar Archivo</Button>
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
                <Alert key='warning' variant='warning'>
                   Hay conflictos con la importacion.
                </Alert>
                {' '}
                <CSVDownloader onClick={e => {setDescarga(false)}}
                type={Type.Button}
                filename={'resultado'}
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