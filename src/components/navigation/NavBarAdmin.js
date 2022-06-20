import React, { Component } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import {FcHome,FcDataSheet, FcButtingIn, FcSupport}  from 'react-icons/fc';

export const NavbarAdmin = () => {
    return(
        <>
            <Nav style={{background:"white"}}>
                <Bars />
                <img src="http://alimentos.web.unq.edu.ar/wp-content/uploads/sites/99/2017/10/LOGO_UNQ-HD.jpg" alt='unq'></img>
              
                <NavBtn>
                  <NavBtnLink to='/signIn' onClick={() => localStorage.removeItem("jwt")}>Sign Out</NavBtnLink>
                </NavBtn>
            </Nav>
            <Nav style={{background:"white", display: "inline"}}>
                
                <NavMenu style={{background:"white",  float: "left", display: "inline", "padding-top": "7%"}}>
                    <NavLink to='/'>
                       <FcHome/> Dashboard
                    </NavLink>                
                    <NavLink to='/requests'>
                        <FcDataSheet/>Solicitudes
                    </NavLink>                
                    <NavLink to='/students'>
                       <FcButtingIn/> Alumnos
                    </NavLink> 
                    <NavLink style={{background:"white","padding-top": "245%"}} to='/config'>
                       <FcSupport/> Configuracion
                    </NavLink> 

                                   
                </NavMenu>
	        </Nav>            
        </>   
    );
}