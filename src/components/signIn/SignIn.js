import React, { useEffect, useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';   
import Tab from 'react-bootstrap/Tab';   
import Container from 'react-bootstrap/Container';  
import Row from 'react-bootstrap/Row';    
import Col from 'react-bootstrap/Col';  
import { Login } from './Login';
import { CreateAccount } from './CreateAccount';
export function SignIn() {
    useEffect(() => {
        document.body.style = 'background: #F8F8FF;';
    })
    return (
        <Container>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row className="justify-content-md-center">
            <Col className="col-md-8" >
            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="login" title="Login">
                <Login/>
            </Tab>
            <Tab eventKey="createAccount" title="Crear Cuenta">
                <CreateAccount/>
            </Tab>
            </Tabs>
            </Col>
            </Row>
        </Container>
    );
}
