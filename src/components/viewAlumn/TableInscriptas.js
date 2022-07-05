import { Table } from "react-bootstrap";
import {horarioToString} from '../../utils/time';


export default function TableInscriptas(props){
    console.log("TablaInscriptas ",props);
    return(<>
            <Table striped bordered hover className='table-responsive'>
            <tbody>
                <tr>
                    <td>Nombre</td>
                    <td>Comision</td>
                    <td>Horario</td>
                    <td>Cupos Totales</td>
                    <td>Cupos Disponibles</td>

                </tr>
                {
                    props.inscriptas.map(mat => {
                        return(
                        <tr key={Math.random()}>
                            <td>{mat.materia}</td>
                            <td>{mat.numero}</td>
                            <td>{horarioToString(mat.horarios)}</td>
                            <td>{mat.cuposTotales}</td>
                            <td>{mat.cuposDisponibles}</td>

                        </tr>)
                    })
                }
            </tbody>
        </Table>
    </>)
} 