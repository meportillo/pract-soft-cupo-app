import axios from 'axios';
import { getToken } from '../utils/auth';
var path = process.env.REACT_APP_BACK_URL_API

//var token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQb3N0aW5zY3JpcGNpb25lcyBKV1RUb2tlbiIsImRpcmVjdGl2byI6ImdhYmlAdW5xdWUuZWR1LmFyIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ESVJFQ1RJVk8iXSwiaWF0IjoxNjU0ODAyNjk1LCJleHAiOjE2NTQ4ODkwOTV9.9bwWCk4mwdJlNKtBCsX2zqNAAtZXqXGp0Uq2Z2NZJ8_2EO4PUYFXg9Hh5sH6PfCDvZY55AzlbB3qCTdHIfqfpQ"
const config = {
    headers: { Authorization: getToken() }
};


const getSubjects2 = ()=>{
    const config = {
        headers: { Authorization: getToken() }
    };
    return axios.get(path+'/api/materias',config)
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
    const config = {
        headers: { Authorization: getToken() }
    };
    axios.get(path+'/api/comision/?anio='+anio+'&semestre='+semestre,config)
    .then(response => {
        setter(response.data);
    })
    .catch(error=> {
        console.log(error);
    });
}
const getCommisionsBySubject = (code) => {
    const config = {
        headers: { Authorization: getToken() }
    };
    return axios.get(path+`/api/materias/${code}/comision`,config)
    .then(response => {
        return response.data
    })
    .catch();
}
const getRequestsByCommision = (comisionId, setter) => {
    const config = {
        headers: { Authorization: getToken() }
    };
    axios.get(path+'/api/comisiones/'+comisionId+'/solicitantes',config)
    .then(response => {
        setter(response.data);
    })
    .catch(error=> {
        console.log(error);
    });
}

const postCreateRequest= (dni,listComm) =>{
    const config = {
        headers: { Authorization: getToken() }
    };
        return axios.patch(path+'/api/alumnos/'+dni+'/formulario/?idComision='+listComm,{},config)
        .then(response => {
            return response
        })
        .catch(error=>{
            alert(error.response.data.error+ ": " + error.response.data.message );
        })

};

const patchRequest= (dni,id, state, formId) =>{
    const config = {
        headers: { Authorization: getToken() }
    };

   return axios.patch(path+'/api/alumnos/'+dni+'/solicitudes/'+id+'?formularioId='+formId+'&estado='+state,{},config)
    .then((response) => {
        return response;
    })
    .catch((error)=>{
        return error;
    })

};

const patchCerrarFormulario = (id,dni) =>{
        const config = {
        headers: { Authorization: getToken() }
    };
    return axios.patch(path+'/api/formulario/'+id+'/cerrar?dni='+dni,{},config)
    .then((response) => {
        return response
    })
    .catch((error)=>{
        alert(error.response.data.error+ ": " + error.response.data.message );
        return error
    }) 
}


export {patchCerrarFormulario,getSubjects2, getCommissions, getRequestsByCommision, getCommisionsBySubject, postCreateRequest,patchRequest};