const getSubjects = new Promise(function(resolve, error ){
    
    let subjects = [
        {'nombre':'Estructura de Datos', 'short_name':'ED' ,'codigo':123456, 'comisiones': [{ 'codComision': 'C1', 'horaInicio': '14:00', 'horaFin': '18:00'},{ 'codComision': 'C2', 'horaInicio': '10:00', 'horaFin': '12:00'},{ 'codComision': 'C3', 'horaInicio': '10:00', 'horaFin': '12:00'}]},
        {'nombre':'Redes de Computadoras', 'short_name':'RE' ,'codigo':123457, 'comisiones': [{ 'codComision': 'C1', 'horaInicio': '17:00', 'horaFin': '21:00'},{ 'codComision': 'C2', 'horaInicio': '10:00', 'horaFin': '12:00'}]},
        {'nombre':'Programación Funcional', 'short_name':'PF' ,'codigo':123458, 'comisiones': [{ 'codComision': 'C1', 'horaInicio': '17:00', 'horaFin': '21:00'},{ 'codComision': 'C2', 'horaInicio': '10:00', 'horaFin': '12:00'}]},
        {'nombre':'Sistemas Operativos', 'short_name':'SO' ,'codigo':123459, 'comisiones': [{ 'codComision': 'C1', 'horaInicio': '17:00', 'horaFin': '21:00'}]}
        ];

    try 
    {
        resolve(subjects);
    }catch(e){
        error(e);
    }

});

const getRequests = new Promise(function(resolve,error){
    let listRequests= [{ 'id':1, 'dni': 40555666, 'legajo': 1256, 'materia': 'Base de Datos', 'quarter': 'Segundo', 'year': 2022  },
    { 'id':2, 'dni': 40555666, 'legajo': 123456, 'materia': 'Base de Datos', 'quarter': 'Segundo', 'year': 2022  },
    { 'id':3, 'dni': 40555789, 'legajo': 1234, 'materia': 'Base de Datos', 'quarter': 'Segundo', 'year': 2022  },
    { 'id':4, 'dni': 40555159, 'legajo': 12346, 'materia': 'Base de Datos', 'quarter': 'Segundo', 'year': 2022  },
    { 'id':5, 'dni': 40555357, 'legajo': 12345, 'materia': 'Base de Datos', 'quarter': 'Segundo', 'year': 2022  }]

    try 
    {
        resolve(listRequests);
    }catch(e){
        error(e);
    }


});

export {getSubjects,getRequests};