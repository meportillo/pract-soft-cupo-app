import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';   
import Alert from 'react-bootstrap/Alert';    

import { useCSVReader } from 'react-papaparse';

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

export const ImportFile = () => {
  const { CSVReader } = useCSVReader();
  const [carrera,setCarrera] = useState("");
  const [data,setData] = useState([]);

  const mapMateriasSegunCarrera = (carrera) => {
      switch(carrera) {
          case "TPI2010" : 
              return mapCarreraTPI2010(); 
      }
  } 
  //mapear la materia de ese plan
  const mapCarreraTPI2010 = () => {
      const result = data.map(materia => {
          return {}
      })  
  }

  const enviarCSV = () => {
      const res = mapMateriasSegunCarrera(carrera);
      //enviar el res al back
  } 
  return (
    <>
    <h4 style={{"textAlign":"center"}}>Seleccionar el plan de carrera de las materias que va Subir</h4>
    <Form.Select className="form-control" onChange={e => setCarrera(e.target.value)}>
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
          <CSVReader
            config={
              {
                  skipEmptyLines: 'greedy',
                  header:true
              }
            }
            onUploadAccepted={(results) => {
              console.log('---------------------------');
              console.log(results)
              setData(results)
              console.log('---------------------------');
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
                  <button {...getRemoveFileProps()} style={styles.remove}>
                    Resetear
                  </button>
                </div>
                <ProgressBar style={styles.progressBarBackgroundColor} />
              </>
            )}
          </CSVReader>
          <div style={{"display":"flex","justifyContent":"center"}}>
              <Button onClick={enviarCSV} >Enviar CSV cargado</Button>
          </div>
          </>
    }
    </>
  );
}