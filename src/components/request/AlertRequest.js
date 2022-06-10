import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from "react";
export  function AlertRequest(props){

    useEffect(()=>{
    },[])
    const [message] = useState(props.message);

    return(
     <Alert variant={props.error?"danger":"success"} onClick={props.click}  dismissible>
        <Alert.Heading>{props.message}</Alert.Heading>
      </Alert>
    )
}