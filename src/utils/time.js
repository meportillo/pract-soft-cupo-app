const  horarioToString = (horarios)=>{
    return horarios && horarios.map(({dia,inicio,fin}) => {
        return <div> {dia} {inicio}-{fin}</div>
    })
}
export{horarioToString}