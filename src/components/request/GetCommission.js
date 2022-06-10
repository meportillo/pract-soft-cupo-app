import React, { useState , useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getCommisionsBySubject} from '../../services/SubjectService';

export default function GetCommssion(code){
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

