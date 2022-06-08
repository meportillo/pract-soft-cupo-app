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
// const users = {gabi: {isAdmin:true}, miguel: {username:"miguel",dni:"12345678",isAdmin:false}}
const login = (dni,contrasenia) => {
    const body = {contrasenia,dni};
    return axios.post(`${path}/api/auth/alumno/login`,body)
    .then(res => new Promise((resolve,error)=>resolve(res.headers.authorization)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data)))
}

const loginAdmin = (correo,contrasenia) => {
    const body = {contrasenia,correo};
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
    return axios.get(`http://localhost:8081/api/alumnos/${dni}/materias`,{headers:header})
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
    const comisiones = subjects.map(s => s.comisiones.map(com => com.id)).flat()
    const url = `http://localhost:8081/api/alumnos/solicitudes/${dni}`
    // const options = {
    //     method: 'POST',
    //     headers: { 'content-type':'application/json' },
    //     data: {"comisiones":comisiones},
    //     url,
    //   };
    console.log(comisiones,dni)
    return axios.post(url,{"comisiones":comisiones})
    // .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    // .catch(err=>new Promise((resolve,error)=>error(err.response)))
}

export {getStudents, login,loginAdmin, createUser, getComissions, getSubjectsOfStudent, getRequestsOfStudent, sendRequest};