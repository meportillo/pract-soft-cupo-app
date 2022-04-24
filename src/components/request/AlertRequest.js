import Alert from 'react-bootstrap/Alert';
import React, { useState } from "react";
export  function AlertRequest(props){
//    console.log(props);

    const [message, setMessage] = useState(props.message);

    return(
     <Alert variant="danger" show={props.show}  dismissible>
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    )
}