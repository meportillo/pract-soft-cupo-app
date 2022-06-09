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
const loginAdmin = (correo,contrasenia) => {
    const body = {contrasenia,correo};
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

const getComissions = (materia,setter) => {
    const config = {
        headers:{
            Authorization: getToken(),
        }
    }
    axios.get(`${path}/api/materias/${materia}/comision`,config)
    .then(res=>{
        setter(res.data)
    })
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
    const comisiones = subjects.map(s => s.comisiones.map(com => com.id)).flat()
    const body = {
        comisiones: comisiones,
        comisionesInscripto: [1]
      }
    const url = `http://localhost:8081/api/alumnos/${dni}/solicitudes`
    return axios.post(url,body,{headers:header})
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


export {getStudents, login,loginAdmin, createUser, getComissions, getSubjectsOfStudent, getRequestsOfStudent, sendRequest};
