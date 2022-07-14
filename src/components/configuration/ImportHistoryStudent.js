import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { usePapaParse } from 'react-papaparse';
import {FcCancel} from  "react-icons/fc";
import {  Button } from 'react-bootstrap';
import { createAlums, updateHistory } from '../../services/StudentService';
import { AlertRequest } from '../request/AlertRequest';
import { useCSVDownloader } from 'react-papaparse';
import Alert from 'react-bootstrap/Alert';

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
        updateHistory(historia)
        .then(response=>{
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
            console.log(error);
          /*  const results = jsonToCSV(error.response.data);
            setResultadoProceso(results);
            setDescarga(true);*/
            console.log('---------------------------');
          //  console.log('Results: TO CSV', results);
            console.log('---------------------------');            
        })
    }

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
          showDescarga?
            <> {' '}
                <Alert key='warning' variant='warning'>
                   Hay conflictos con la importacion.
                </Alert>
                {' '}
                <CSVDownloader onClick={e => {setDescarga(false)}}
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