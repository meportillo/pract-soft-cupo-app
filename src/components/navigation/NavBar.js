import React, { Component } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
} from './NavbarElements';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

    const navigate = useNavigate();
    
    const closeSession = () => {
        localStorage.removeItem("jwt");
        navigate("/signIn");
    }

    return(
        <Nav style={{background:"white"}}>
            <Bars />
            <img src="http://alimentos.web.unq.edu.ar/wp-content/uploads/sites/99/2017/10/LOGO_UNQ-HD.jpg" alt='unq'></img>
            <NavMenu>
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink to='/cupo'>
                    Formulario Alta de Cupo
                </NavLink>
                <NavLink to='/cupo/edit'>
                    Editar Formulario Alta de Cupo
                </NavLink>             
            </NavMenu>
            <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <BsFillPersonFill style={{"marginRight":5}}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={closeSession}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
            </Dropdown>
	    </Nav>
    );
}
