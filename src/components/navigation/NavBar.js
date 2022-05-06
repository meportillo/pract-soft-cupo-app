import React, { Component } from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';


export default class Navbar extends Component {



    render() {
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
{/* {                <NavLink to='/consulta'>
                    Consulta solicitud de Cupo
                </NavLink>} */}
            </NavMenu>
            {/* <NavBtn> */}
            {/* <NavBtnLink to='/sign-up'>Ingresar</NavBtnLink>
            </NavBtn> */}
	    </Nav>
    );
    };
}
