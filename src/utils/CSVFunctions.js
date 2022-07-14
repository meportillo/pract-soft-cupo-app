/**
 * 	
planillaMaterias
Example Value
Model
{
  "plan": "TPI2010",
  "materias": [
    {
      "ca": 100,
      "cb": 45,
      "cc": 71,
      "ci": 20,
      "cicloLI": "NBW",
      "cicloTPI": "CI",
      "co": 32,
      "codigo": 123456,
      "creditos": 16,
      "fila": 3,
      "materia": "Arquitectura Orientada a Servicios",
      "nbw": 12,
      "correlativas": [
        "string"
      ]
    }
  ]
}
 */
//"Plan TPI 2010,	Código Materia,	Créditos,	Materia,	Correlatividades,	Secuencialidad CO - créditos,	Secuencialidad CA - créditos"

const mapMateriasPlan2010 = (filas) => {
   return filas.slice(1,filas.length).map((fila,index) => {
            const getCorrelativas = (crs) => crs.replace(/[{}]/g, '').split(",").map(c => c.trim())  
            const correlativas = fila[4].trim() ? getCorrelativas(fila[4].trim()) : []  
            const resultado = {
                    "ca": fila[6].trim() ? fila[6].trim(): 0,
                    "cb": 0,
                    "cc": 0,
                    "ci": 0,
                    "cicloTPI": fila[0].trim() ? fila[0].trim(): "",
                    "co": fila[5].trim() ? fila[5].trim(): 0,
                    "codigo": fila[1].trim() ? fila[1].trim(): "",
                    "creditos": fila[2].trim() ? fila[2].trim(): 0,
                    "fila": index + 1,
                    "materia": fila[3].trim() ? fila[3].trim(): "",
                    "nbw": 0,
                    "correlativas": correlativas
            }
            return resultado 
          })  
}

export {mapMateriasPlan2010}