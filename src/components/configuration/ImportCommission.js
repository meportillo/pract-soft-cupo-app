import React, { useEffect, useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import { usePapaParse } from 'react-papaparse';
import {FcCancel} from  "react-icons/fc";
import {  Button, Card } from 'react-bootstrap';
import { createAlums, updateHistory } from '../../services/StudentService';
import { AlertRequest } from '../request/AlertRequest';
import { useCSVDownloader } from 'react-papaparse';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { getCuatrimestreByanio, uploadCommisiones } from '../../services/SubjectService';
import { periodoActual } from '../../utils/time';


export default function ImportCommission(){

    const { CSVReader } = useCSVReader();
    const [commissions,setCommissios] = useState([]);
    const [isOkToUpload, setIsOkToUpload] = useState(false);
    const { jsonToCSV } = usePapaParse();
    const [showMessage,setShowMessage] = useState(false);
    const [showDescarga,setDescarga] = useState(false);
    const [callError, setCallError] = useState(false);
    const [message,setMessage] = useState('');
    const { CSVDownloader, Type } = useCSVDownloader();
    const [resultadoProceso, setResultadoProceso] = useState([]);
    const [showSpiner, setShowSpiner] = useState(false);
    const [cuatrimestre,setCuatrimestre] = useState();

    useEffect(()=>{
        getCuatrimestreByanio(periodoActual().anio,periodoActual().S)
        .then(response=>{
            setCuatrimestre(response.data);
            console.log(response);
        })},[])

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
        uploadCommisiones(commissions,cuatrimestre.inicioInscripciones,cuatrimestre.finInscripciones)
        .then(response=>{
            setShowSpiner(true);
            console.log(response);
            if(response.response.status !== 201 && response.response.status !== 200){
                const results = jsonToCSV(response.response.data);
                console.log('---------------------------');
                console.log('Results: TO CSV', results);
                console.log('---------------------------');
                setResultadoProceso(results);
                setDescarga(true);
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
    const proccessCom = (com)=>{
        let temp = com.split(' ')[0].split('-')[com.split(' ')[0].split('-').length-2];
        console.log(temp);
        if(Number.isInteger(temp))
            return temp;
        else 
            return temp === undefined ? '':temp.charAt(temp.length-1);
    }

    const comisionesExample = [{
        'Código':'80005',
        'Actividad':'Elementos de Programación y Lógica',
        'Comisión':'80005-B1-CYT2 (Presencial)',
        'Modalidad':'Presencial',
        'Ubicacion':'Berazategui',
        'Banda Horaria y Aula':'Lun 18:00 a 19:59 - Teórica / Mie 18:00 a 19:59 - Teórica'
    }];

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
            setCommissios([]);
            console.log('---------------------------');
            console.log(results);

            Promise.all(results.data).then((commsRes)=>{
            let commsTemp = [];

           let fila = 1;
           commsRes.map(elem=>{
                let com = {
                    'codigo': elem['Código'] === undefined? '':elem['Código'] ,
                    'actividad': elem.Actividad === undefined? '': elem.Actividad,
                    'comision': elem['Comisión'] === undefined? '': proccessCom(elem['Comisión']),
                    'locacion': elem['Ubicacion'] === undefined? '': elem['Ubicacion'].includes(' ')?elem['Ubicacion'].split(' ')[0]+'_'+elem['Ubicacion'].split(' ')[1]:elem['Ubicacion'],
                    'modalidad': elem.Modalidad === undefined? '': (elem.Modalidad.includes(' ')? (elem.Modalidad.split(' ')[0]+'_'+elem.Modalidad.split(' ')[1]).toUpperCase():elem.Modalidad.toUpperCase()),
                    'horarios': elem['Banda Horaria y Aula'] === undefined || elem['Banda Horaria y Aula'] === "" ? []: elem['Banda Horaria y Aula'].split('/').map(horario=>{
                        let parse = horario.trim().split(' ');
                        
                        let obj = {
                            'dia':parse[0],
                            'fin':parse[3],
                            'inicio':parse[1]
                        }
                        console.log(obj);
                        return obj
                    }) , 
                    'fila': fila 

                }
                fila+=1
                if(!(com.actividad==='' && com.comision===''))
                    commsTemp.push(com);
            });
                Promise.all(commsTemp)
                .then(promises =>{
                    console.log(promises); 
                    setCommissios(promises);
                    setIsOkToUpload(true);
                });
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

        <Card>
            <Card.Header>
                Formato CSV 
            </Card.Header>
            <Card.Body>            <Card.Text>
                Formato del Header : Código, 	Actividad,	Comisión,	Modalidad,	Ubicacion,	Banda Horaria y Aula
            </Card.Text>
            <Card.Text> Formato de las Filas : 80005,	Elementos de Programación y Lógica,	80005-B1-CYT2 (Presencial),	Presencial,	Berazategui,	Lun 18:00 a 19:59 - Teórica / Mie 18:00 a 19:59 - Teórica</Card.Text>
            <CSVDownloader
                type={Type.Button}
                filename={'ejemplo'}
                bom={true}
                config={{
                    delimiter: ',',
                }}
                data={
                    comisionesExample
                }
                >
                Descargar Ejemplo CSV
                </CSVDownloader>
            </Card.Body>
          </Card>
                            
                {//fun_ = getRemoveFileProps
                }
                <div style={styles.csvReader}>
                <br></br>
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
                <Alert key='warning' variant='warning' dismissible onClick={(e)=>{setDescarga(false)}}>
                   Hay conflictos con la importacion.
                </Alert>
                {' '}
                <CSVDownloader
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