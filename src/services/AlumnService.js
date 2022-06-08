import axios from 'axios'; 
import { getToken } from '../utils/auth';
var path = process.env.REACT_APP_BACK_URL_API

const getStudents = new Promise(function(resolve, error ){

    let students = {
        nombre : "Pepe" , apellido : "Argento" , legajo : 123456, materiasAprobadas : 
        [{nombre : "IntroProgramacion" , nota: 9},{nombre : "Matematica" , nota : 8},{nombre : "LecturaEscritura" , nota : 8}],
        cuposPedidos: 
        [{'nombre':'Estructura de Datos', 'short_name':'ED' ,'codigo':123456, 
            comision: { 'codComision': 'C1', 'horaInicio': '14:00', 'horaFin': '18:00'}},
        {'nombre':'Organizacion de Computadoras', 'short_name':'ORGA' ,'codigo':2122, 
            comision: { 'codComision': 'C2', 'horaInicio': '18:00', 'horaFin': '22:00'}}
        ]
    }

    try 
    {
        resolve(students);
    }catch(e){
        error(e);
    }

})
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

const createUser = (data) => new Promise((resolve,error) => {
    return resolve({token:"asdasdda"})
}) 

const getSubjectsOfStudent = (dni) => {
    const header = {
        Authorization: getToken()
    }
    return axios.get(`${path}/api/alumnos/${dni}/materias`,{headers:header})
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}

const getRequestsOfStudent = (dni) => {
    const header = {
        Authorization: getToken()
    }
    return axios.get(`${path}/api/alumnos/${dni}/materias`,{headers:header})
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
    .catch(err=>new Promise((resolve,error)=>error(err.response)))
}

export {getStudents, login, createUser, getSubjectsOfStudent, getRequestsOfStudent, sendRequest, loginAdmin};