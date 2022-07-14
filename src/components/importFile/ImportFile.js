import React, { useState, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';   
import Alert from 'react-bootstrap/Alert';    
import Card from 'react-bootstrap/Card'; 
import { mapMateriasPlan2010, mapMateriasPlanLI } from "../../utils/CSVFunctions"
import { useCSVReader } from 'react-papaparse';
import { CSVDownloader } from '../importFile/CSVDownloader'
const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  browseFile: {
    width: '20%',
  },
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  },
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  },
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  }
};

export const ImportFile = (props) => {
  const { CSVReader } = useCSVReader();
  const [carrera,setCarrera] = useState("");
  const [data,setData] = useState([]);
  const [error,setError] = useState(false) 
  const deleteFile = useRef(null); 
  const [enviando,setEnviando] = useState(false);
  const [success,setSuccess] = useState(false)
  const [error400,setError400] = useState(false)
  const [isOkToUpload, setIsOkToUpload] = useState(false);
  const [conflictsImport,setConflictsImport] = useState([])
  const mapMateriasSegunCarrera = (rows) => {
      switch(carrera) {
          case "TPI2010" : 
              return mapCarreraTPI2010(rows); 
          case "TPI2015" :
              return mapCarreraTPI2015(rows);
          case "LI":
              return mapCarreraLI(rows);

      }
  };

  const mapCarreraTPI2015 = () => {
        
  };

  const mapCarreraLI = (rows) => {
    return mapMateriasPlanLI(rows)
  };
 
  const mapCarreraTPI2010 = (rows) => {
      return mapMateriasPlan2010(rows)
  }

  const textByCarrera = () =>{
      switch(carrera) {
        case "TPI2010" : return(
        <>
          <Card.Text>
            Header : Plan TPI 2010,	Código Materia,	Créditos,	Materia,	Correlatividades,	Secuencialidad CO - créditos,	Secuencialidad CA - créditos
          </Card.Text>
          <p style={{"color" : "red"}}>En caso de no tener valor un campo no poner nada : CA, ,8</p>
          <Card.Text>Fila : CC,1051,8,Programación con Objetos III,{"{3032}"},102,52</Card.Text>
        </>
        );
        case "TPI2015" : return(
          <>
          <Card.Text>
            Header : Plan TPI 2010,Código Materia,Créditos,Materia,Correlatividades,Secuencialidad CI - créditos,Secuencialidad CO - créditos,Secuencialidad CA - créditos,Secuencialidad CC - créditos
          </Card.Text>
          <p style={{"color" : "red"}}>En caso de no tener valor un campo no poner nada : CA, ,8</p>
          <Card.Text>Fila : CA,1044,12,Estrategias de Persistencia,{ "{1035, 1037}" },30,70</Card.Text>
          </>
          ); 
        case "LI" : return(
          <>
          <Card.Text>
            Header : Plan TPI 2010,Código Materia,	Créditos,	Materia,	Correlatividades,	Secuencialidad CI - créditos,Secuencialidad NBW (Núcleo Básico), - créditos	Secuencialidad CB  (W15BO) - créditos
          </Card.Text>
          <p style={{"color" : "red"}}>En caso de no tener valor un campo no poner nada : CA, ,8</p>
          <Card.Text>Fila : CA,1051,8,Programación con Objetos III,{"{1037}"},30,180,56 </Card.Text>
          </>
          );
        default : return(<></>)
      }
      
  }


  const enviarCSV = () => {
    const materias = mapMateriasSegunCarrera(data)
    props.importar({"plan":carrera,"materias":materias})
    .then(res => {
        setEnviando(false)
        setSuccess(true)
    })
    .catch(err => {
        setEnviando(false)
        if(err.status == "400") {
            setError400(true)
            setTimeout(() => setError400(false),5000)
        }else if(err.status == "409"){
          setConflictsImport(err.data)
          setError(true)
        }else{
          setError(true)
        }
    })
    setEnviando(true)
  } 
  return (
    <>
    <h4 style={{"textAlign":"center"}}>Seleccionar el Plan de carrera de las materias que va subir</h4>
    <p style={{"color" : "red"}}>Cuando se selecione una carrera se mostrara el formato a respetar </p>
    <Form.Select className="form-control" onChange={e => {
      if (null != deleteFile.current) {
        deleteFile.current.click()
      }
      setCarrera(e.target.value)
      }
    }>
        <option key={0} value={""} >Seleccionar opcion</option>
        <option key={1} value={"TPI2010"} >Plan TPI 2010</option>
        <option key={2} value={"TPI2015"} >Plan TPI 2015</option>
        <option key={3} value={"LI"} >Plan LI</option>
    </Form.Select>
    <br></br>
    {
        carrera == "" 
          ? <></>
          : <>
            <div style={{"display":"flex","justifyContent":"center"}}>
              <Card style={{}}>
                <Card.Body>
                  <Card.Title>Formato CSV {carrera}</Card.Title>
                  { textByCarrera() }
                </Card.Body>
              </Card>
            </div>
            <br></br>
          <CSVReader
            onUploadAccepted={(results) => {
              setData(results.data)
              setIsOkToUpload(true)
            }}
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
            }) => (
              <>
                <div style={styles.csvReader}>
                  <button type='button' {...getRootProps()} style={styles.browseFile}>
                    Cargar CSV
                  </button>
                  <div style={styles.acceptedFile}>
                    {acceptedFile && acceptedFile.name}
                  </div>
                  <button ref={deleteFile} {...getRemoveFileProps()} style={styles.remove}>
                    Eliminar
                  </button>
                </div>
                <ProgressBar style={styles.progressBarBackgroundColor} />
              </>
            )}
          </CSVReader>
          <div style={{"display":"flex","justifyContent":"center"}}>
              <Button disabled={!isOkToUpload} onClick={enviarCSV}>Enviar CSV cargado</Button>
          </div>
          <br></br>
          {
            enviando ? <div style={{textAlign:"center"}}>Enviando csv ... </div>: <></> 
          }
          {
            error400 ?  
              <Alert variant="warning" onClose={() => setError400(false)} dismissible>
                  Verifique que el csv tiene el formato aclarado
              </Alert>
              :<></>
          }
          { error ?
                  <div>
                      <Alert variant="warning" onClose={() => setError(false)} dismissible>
                                Hubo algunos errores al importar el csv para mas informacion descargar el csv 
                      </Alert>
                      <CSVDownloader conflicts={conflictsImport} name="errorCSVMaterias"></CSVDownloader>
                  </div>
              :   <></>
          }
          { success ? <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                            Se importaron las materias con exito
                      </Alert> : <></>
          }
          </>
    }
    </>
  );
}