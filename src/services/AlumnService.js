import axios from 'axios'; 
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
const login = (username,password) => new Promise((resolve,error) => {
    if (username === "miguel") {
        return resolve({username:username,dni:"12345678",isAdmin:false})
    }else{
        return resolve({username:username,dni:"12345678",isAdmin:true})
    }
    // return error({message:"no existe el usuario"})
})

const createUser = (data) => new Promise((resolve,error) => {
    return resolve({token:"asdasdda"})
}) 

const getSubjectsOfStudent = (dni) => {
    return axios.get(`http://localhost:8081/api/alumnos/materias/${dni}`)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}

const getRequestsOfStudent = (dni) => {
    return axios.get(`http://localhost:8081/api/alumnos/${dni}`)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}
 

export {getStudents, login, createUser, getSubjectsOfStudent, getRequestsOfStudent};