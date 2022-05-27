import React, { Component } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

export const NavbarAdmin = () => {
    return(
        <Nav style={{background:"white"}}>
            <Bars />
            <img src="http://alimentos.web.unq.edu.ar/wp-content/uploads/sites/99/2017/10/LOGO_UNQ-HD.jpg" alt='unq'></img>
            <NavMenu>
                <NavLink to='/'>
                    Home
                </NavLink>                
            </NavMenu>
            <NavBtn>
             <NavBtnLink to='/signIn' onClick={() => localStorage.removeItem("jwt")}>Sign Out</NavBtnLink>
            </NavBtn>
	    </Nav>
    );
}