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

const login = (password,username) => new Promise((resolve,error) => {
    console.log(password,username)
    return resolve({token:"asdasdda"})
    // return error({message:"no existe el usuario"})
})

const createUser = (data) => new Promise((resolve,error) => {
    return resolve({token:"asdasdda"})
}) 


export {getStudents, login, createUser};