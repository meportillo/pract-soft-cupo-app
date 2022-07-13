import React, { useState } from 'react';
import { useCSVReader } from 'react-papaparse';
import {FcCancel} from  "react-icons/fc";
import { Button } from 'react-bootstrap';
import { createAlums } from '../../services/StudentService';

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

    const sendFileStudent = ()=>{
        createAlums(alumnos)
        .then(response=>{
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
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
            setAlumnos([]);
            console.log('---------------------------');
            console.log(results);

            Promise.all(results.data).then((alumsRes)=>{
            let alumnosTemp = [];
            alumsRes.map(elem=>{
                let alum = {
                    'apellido': elem.Apellido === undefined? '':elem.Apellido ,
                    'carrera': elem.Propuesta === undefined? '': elem.Propuesta,
                    'dni': elem.Documento === undefined? '': elem.Documento,
                    'nombre': elem.Nombre === undefined? '': elem.Nombre,
                    'correo': elem.correo === undefined? '': elem.correo
                }
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
      </>);

}
export {CSVReader}