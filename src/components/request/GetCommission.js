import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getCommisionsBySubject} from '../../services/SubjectService';

/*

cuposDisponibles: 5
cuposTotales: 30
horarios: (2) [{…}, {…}]
id: 5
materia: "Introducción a la Programación"
numero: 1
sobreCuposTotales: 5

*/ 
export default function GetCommssion(code){
    console.log(code)
    const [comisiones, setComisiones] = useState();

    useEffect(()=>{
        getCommisionsBySubject(code,setComisiones)

    },[]);
    if(comisiones.length == 0){
        return <><td>No Hay comisiones</td></>
    }else{
        return(<>
                {comisiones.length}
        </>);
    }
}

