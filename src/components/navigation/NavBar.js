import React, { Component } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';


export const Navbar = () => {
    return(
        <Nav>
            <Bars />
            <img src="http://alimentos.web.unq.edu.ar/wp-content/uploads/sites/99/2017/10/LOGO_UNQ-HD.jpg" alt='unq'></img>
            <NavMenu>
                <NavLink to='/'>
                    Home
                </NavLink>                
                <NavLink to='/cupo'>
                    Formulario Alta de Cupo
                </NavLink>
            </NavMenu>
            <NavBtn>
             <NavBtnLink to='/signIn' onClick={() => localStorage.removeItem("user")}>Sign Out</NavBtnLink>
            </NavBtn>
	    </Nav>
    );
}
