import React, { Component } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import {FcHome,FcDataSheet, FcButtingIn, FcSupport, FcDiploma1}  from 'react-icons/fc';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

export const NavbarAdmin = () => {

    const navigate = useNavigate();
    
    const closeSession = () => {
        localStorage.removeItem("jwt");
        navigate("/signIn");
    }

    return(
        <>
       <Nav style={{background:"white"}}>
            <Bars />
            <img style={{position:"relative", left:"20px"}}src="http://alimentos.web.unq.edu.ar/wp-content/uploads/sites/99/2017/10/LOGO_UNQ-HD.jpg" alt='unq'></img>
            <Dropdown style={{position:"relative", right:"20px", top:"20px"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <BsFillPersonFill style={{"marginRight":5}}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={closeSession}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
        </Nav>
            <Nav style={{background:"white", display: "inline"}}>
                
                <NavMenu style={{background:"white",  float: "left", display: "inline", "paddingTop": "7%"}}>
                    <NavLink to='/'>
                       <FcHome/> Dashboard
                    </NavLink>                
                    <NavLink to='/requests'>
                        <FcDataSheet/> Solicitudes
                    </NavLink>                
                    <NavLink to='/students'>
                       <FcButtingIn/> Alumnos
                    </NavLink>
                    <NavLink to='/subjects'>
                       <FcDiploma1/> Materias
                    </NavLink>  
                    <NavLink to='/config'>
                       <FcSupport/> Configuracion
                    </NavLink> 
                </NavMenu>
	        </Nav>            
        </>   
    );
}