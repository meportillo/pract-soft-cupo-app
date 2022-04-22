import Alert from 'react-bootstrap/Alert';
import React, { useState } from "react";

export  function AlertRequest(props){
    console.log(props);
    const [show, setShow] = useState(props.show);
    const [message, setMessage] = useState(props.message);

    return(<>
     <Alert variant="danger" onClose={() => setShow(false)} closeLabel="Cerrar">
        <Alert.Heading>{message}</Alert.Heading>
      </Alert>
    </>)
}