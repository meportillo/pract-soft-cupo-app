const  horarioToString = (horarios)=>{
    return horarios && horarios.map(({dia,inicio,fin}) => {
        return <div> {dia} {inicio}-{fin}</div>
    })
}

const periodoActual = ()=>{
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    return {
        'anio': year.toString(),
        'S':month >= 8? 'S2': 'S1' 
    }
}

export{horarioToString, periodoActual}