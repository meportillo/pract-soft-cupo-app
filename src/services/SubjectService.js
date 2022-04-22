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

})

export {getSubjects};