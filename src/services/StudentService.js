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


const login = (dni,contrasenia) => {
    const body = {contrasenia,dni};
    return axios.post(`${path}/api/auth/alumno/login`,body)
    .then(res => new Promise((resolve,error)=>resolve(res.headers.authorization)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data)))
}

const loginAdmin = (email,contrasenia) => {
    const body = {contrasenia,correo:email};
    return axios.post(`${path}/api/auth/directivo/login`,body)
    .then(res => new Promise((resolve,error)=>resolve(res.headers.authorization)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data)))
}

const createUser = (dni,password,passwordConfirm) => {
    const body = {
        dni:dni,
        confirmacionContrasenia:passwordConfirm,
        contrasenia:password
    } 
    return axios.post(`${path}/api/auth/alumno/registrar`,body)
    .then(res => new Promise((resolve,error)=>resolve(res.data)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data)))
}

const getSubjectsOfStudent = (dni) => {
    return axios.get(path+'/api/alumno/materias')
    .then(res=>{  
        return new Promise((resolve,error)=>
             resolve(res.data))
             
    })
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}

const getRequestsOfStudent = (dni) => {
    return axios.get(`${path}/api/alumno/formulario`)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}

const getRequestsOfStudentAdmin = (dni) => {
    return axios.get(`${path}/api/alumnos/${dni}`)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}
 
const sendRequest = (subjects,dni) => {
    const comisiones = subjects.filter(s => s.accion == "cupo").map(s => s.comisiones.map(com => com.id)).flat()
    const comisionesInscripto = subjects.filter(s => s.accion == "inscripto").map(s => s.comisiones.map(com => com.id)).flat()
    const body = {
        comisiones: comisiones,
        comisionesInscripto: comisionesInscripto
    }
    const url = `${path}/api/alumno/solicitudes`
    return axios.post(url,body)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data.message)))
}

const updateRequest = (subjects,dni) => {
    const comisiones = subjects.filter(s => s.accion == "cupo").map(s => s.comisiones.map(com => com.id)).flat()
    const comisionesInscripto = subjects.filter(s => s.accion == "inscripto").map(s => s.comisiones.map(com => com.id)).flat()
    const body = {
        comisiones: comisiones,
        comisionesInscripto: comisionesInscripto
    }
    const url = `${path}/api/alumno/solicitudes`
    return axios.patch(url,body)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data.message)))
}

const sendCode = (codigo,dni) => {
    const body = {
        codigo: codigo,
        dni: dni
    }
    return axios.post(`${path}/api/auth/alumno/confirmar`,body)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data.message)))
}

const createAlum = (alum) => {
    let body = [alum];
    return axios.post(`${path}/api/alumnos`,body)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err)))


}

const getAlumByDni = (dni) => {
    return axios.get(`${path}/api/alumnos?dni=${dni}`)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err)))
}


const deleteAlum = (dni) => {
    return axios.delete(`${path}/api/alumnos?dni=${dni}`)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err)))
}

const deleteRequest = () => {
    return axios.delete(`${path}/api/alumno/formulario`)
    .then(res=>new Promise((resolve,error)=>resolve(res)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))

}

const getCuatrimestreActual = () => {
    return axios.get(`${path}/api/alumno/cuatrimestre`)
    .then(res => new Promise((resolve,error)=>resolve(res.data)))
    .catch(err => new Promise((resolve,error)=>error(err)))
}

export { getRequestsOfStudentAdmin,login,deleteRequest ,createUser, getSubjectsOfStudent, getRequestsOfStudent, sendRequest, loginAdmin, sendCode, updateRequest, createAlum, deleteAlum,getAlumByDni, getCuatrimestreActual};
