import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
} from './NavbarElements';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import {FcHome,FcDataSheet}  from 'react-icons/fc';


export const Navbar = () => {

    const navigate = useNavigate();
    
    const closeSession = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");

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
            <NavMenu style={{background:"white",  float: "left", display: "inline", "paddingTop": "5%", height:"80vh"}}>
                <NavLink to='/'>
                    <FcHome/>Home
                </NavLink>
                <NavLink to='/cupo'>
                    <FcDataSheet/>Formulario Alta de Cupo
                </NavLink>
                <NavLink to='/cupo/edit'>
                    <FcDataSheet/>Editar Formulario Alta de Cupo
                </NavLink>  
            </NavMenu>
        </Nav>    
        </>
        
        
    );
}
