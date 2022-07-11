import axios from 'axios';
import { getToken } from '../utils/auth';
var path = process.env.REACT_APP_BACK_URL_API

axios.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

const closeAllRequests = () =>{
    return axios.patch(path + "/api/formulario/cerrar")
    .then(response => {
        return response
    })
    .catch((error)=>{
        console.log(error);
        return error
    }) 
} 

const getSubjects2 = (nombre)=>{
    const url = nombre == "" || nombre == undefined  ? '/api/materias/solicitudes':`/api/materias/solicitudes?nombre=${nombre}`
    return axios.get(path + url)
    .then(response => {
        return new Promise((resolve, error )=>{
            try 
            {
                resolve(response.data);
            }catch(e){
                error(e);
            }

        })
    })
    .catch(error=> {
        console.log(error);
    });
}

const getCommissions = (anio,semestre,setter)=>{
    axios.get(path+'/api/comision/?anio='+anio+'&semestre='+semestre)
    .then(response => {
        setter(response.data);
    })
    .catch(error=> {
        console.log(error);
    });
}
const getCommisionsBySubject = (code) => {
    return axios.get(path+`/api/materias/${code}/comision`)
    .then(response => {
        return response.data
    })
    .catch();
}
const getRequestsByCommision = (comisionId, setter) => {
    return axios.get(path+'/api/comisiones/'+comisionId+'/solicitantes')
    .then(response => {
        setter(response.data);
        return response;
    })
    .catch(error=> {
        console.log(error);
        return error;
    });
}

const postCreateRequest= (dni,listComm) =>{
        return axios.patch(path+'/api/alumnos/'+dni+'/formulario/?idComision='+listComm,{})
        .then(response => {
            return response
        })
        .catch(error=>{
            alert(error.response.data.error+ ": " + error.response.data.message );
        })

};

const patchRequest= (dni,id, state, formId) =>{
   return axios.patch(path+'/api/alumnos/'+dni+'/solicitudes/'+id+'?formularioId='+formId+'&estado='+state,{})
    .then((response) => {
        return response;
    })
    .catch((error)=>{
        return error;
    })

};

const patchCerrarFormulario = (id,dni) =>{
    return axios.patch(path+'/api/formulario/'+id+'/cerrar?dni='+dni,{})
    .then((response) => {
        return response
    })
    .catch((error)=>{
        alert(error.response.data.error+ ": " + error.response.data.message );
        return error
    }) 
}

const updateTimeFormulario = (dateStart,dateEnd,time) =>{
    const oferta = {
        "comisionesACargar": [],
        "finInscripciones": `${dateEnd}T${time}`,
        "inicioInscripciones": `${dateStart}T${time}`
    }
    const body = {
        oferta : oferta
    }
    return axios.post(path+"/api/comisiones/oferta",oferta)
    .then((response) => {
        console.log(response);
        return response
    })
    .catch((error)=>{
        console.log(error);
        return error
    }) 
}

const getAlumnos = () =>{
    return axios.get(path+"/api/alumnos/formulario")
    .then((response) => {
        console.log(response);
        return response.data
    })
    .catch((error)=>{
        console.log(error);
        return error
    }) 
}

const getAlumnosByDni = (dni) =>{
    return axios.get(path+ `/api/alumnos/formulario?dni=${dni}`)
    .then((response) => {
        console.log(response);
        return response.data
    })
    .catch((error)=>{
        console.log(error);
        return error
    }) 
}

const getSubjectsComplete = () => {
    return axios.get(path + "/api/materias")
    .then(response => {
        return response.data
    })
    .catch(error=>{
        return error
    }) 
}

const getCuatrimestreByanio = (anio, semestre) => {
    return axios.get(path+'/api/cuatrimestres?anio='+anio+'&semestre='+semestre)// ?anio='+anio+'&semestre='+semestre)
    .then(response => {
        return response;
    })
    .catch(error=> {
        return error;
    });
}
//http://localhost:8081/api/alumnos/formulario?procesamiento=FALTA_PROCESAR

const getAlumnosSolicFiltro = (filtro) => {
    return axios.get(path+'/api/alumnos/formulario?procesamiento='+filtro)
    .then(response => {
        return response;
    })
    .catch(error=> {
        return error;
    });
}


export {closeAllRequests,getAlumnosSolicFiltro,getCuatrimestreByanio,getSubjectsComplete,getAlumnosByDni,getAlumnos,updateTimeFormulario,patchCerrarFormulario,getSubjects2, getCommissions, getRequestsByCommision, getCommisionsBySubject, postCreateRequest,patchRequest};