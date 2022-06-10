import axios from 'axios'; 
import { getToken } from '../utils/auth';
var path = process.env.REACT_APP_BACK_URL_API

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
    const header = {
        Authorization: getToken()
    }
    return axios.get(`${path}/api/alumnos/${dni}/materias`,{headers:header})
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}

const getRequestsOfStudent = (dni) => {
    const config = {
        headers:{
            Authorization: getToken(),
        }
    }
    return axios.get(`http://localhost:8081/api/alumnos/${dni}`,config)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}
 
const sendRequest = (subjects,dni) => {
    const header = {
        Authorization: getToken()
    }
    const comisiones = subjects.filter(s => s.accion == "cupo").map(s => s.comisiones.map(com => com.id)).flat()
    const comisionesInscripto = subjects.filter(s => s.accion == "guarani").map(s => s.comisiones.map(com => com.id)).flat()
    const body = {
        comisiones: comisiones,
        comisionesInscripto: comisionesInscripto
    }
    const url = `${path}/api/alumnos/${dni}/solicitudes`
    return axios.post(url,body,{headers:header})
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data.message)))
}

const updateRequest = (subjects,dni) => {
    const header = {
        Authorization: getToken()
    }
    const comisiones = subjects.filter(s => s.accion == "cupo").map(s => s.comisiones.map(com => com.id)).flat()
    const comisionesInscripto = subjects.filter(s => s.accion == "guarani").map(s => s.comisiones.map(com => com.id)).flat()
    const body = {
        comisiones: comisiones,
        comisionesInscripto: comisionesInscripto
    }
    const url = `${path}/api/alumnos/${dni}/solicitudes`
    return axios.patch(url,body,{headers:header})
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

export { login, createUser, getSubjectsOfStudent, getRequestsOfStudent, sendRequest, loginAdmin, sendCode, updateRequest};