import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import {FiSend} from  "react-icons/fi";
import { horarioToString } from "../../utils/time";


export default function CommisionRequestShort(props){

    const [commission, setcommission] = useState(props.commission);
    return(<>
                <tr>
                    <th>
                        {props.materia}
                    </th>
                    <th>
                        {commission.numero}
                    </th>
                    <th>
                        {commission.cuposDisponibles}
                    </th>
                    <th>
                         {horarioToString(commission.horarios)} 

                    </th>
                    <th>
                    <Button onClick={e => {props.createRequest(props.dni, commission.id)}}>
                            <FiSend></FiSend>
                        </Button>
                    </th>
                </tr>
           </>);
}