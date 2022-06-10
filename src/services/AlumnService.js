import axios from 'axios'; 

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

var token ="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJQb3N0aW5zY3JpcGNpb25lcyBKV1RUb2tlbiIsImRpcmVjdGl2byI6ImdhYmlAdW5xdWUuZWR1LmFyIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ESVJFQ1RJVk8iXSwiaWF0IjoxNjU0ODAyNjk1LCJleHAiOjE2NTQ4ODkwOTV9.9bwWCk4mwdJlNKtBCsX2zqNAAtZXqXGp0Uq2Z2NZJ8_2EO4PUYFXg9Hh5sH6PfCDvZY55AzlbB3qCTdHIfqfpQ"
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

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
    return axios.get(`${path}/api/alumnos/materias/${dni}`, config)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}

const getRequestsOfStudent = (dni) => {
    return axios.get(`${path}/api/alumnos/${dni}`,config)
    .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    .catch(err=>new Promise((resolve,error)=>error(err.response.data)))
}
 
const sendRequest = (subjects,dni) => {
    const comisiones = subjects.map(s => s.comisiones.map(com => com.id)).flat()
    const url = `${path}/api/alumnos/solicitudes/${dni}`

    console.log(comisiones,dni)
    return axios.post(url,{"comisiones":comisiones},config)
    // .then(res=>new Promise((resolve,error)=>resolve(res.data)))
    // .catch(err=>new Promise((resolve,error)=>error(err.response)))
}

export {getStudents, login, createUser, getSubjectsOfStudent, getRequestsOfStudent, sendRequest};