
import CreateRequest from '../components/request/CreateRequest';
import '@testing-library/jest-dom';
//import { render} from '@testing-library/react';
import { act  } from "react-dom/test-utils";
import { unmountComponentAtNode , render } from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';


let container; 


beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});
  
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
  
// TEST
it('Encabezado del formulario', () => {
    //Renderizado de componente
    act(() => {
        render(<Router>
                    <CreateRequest encabezado='Completar formulario' materias={[]}/>
               </Router>, container)
    });
    //Asersion a validar.
    expect(container.textContent).toContain('Completar formulario');
});
// TEST
it('Texto selector de materias', () => {
    //Renderizado de componente
    act( async() => {
        render(<Router>
                    <CreateRequest encabezado='Completar formulario' materias={[]}/>
               </Router>, container)
    });
    //Asersion a validar.
    expect(container.querySelector('#selectMateria1').textContent).toContain('Seleccionar opcion');
});
// TEST
it('Input Legajo', () => {
    //Renderizado de componente
    act( async() => {
        render(<Router>
                    <CreateRequest legajo="123456" materias={[]}/>
               </Router>, container)
    });
    //Asersion a validar.
    console.log(container.querySelector('#inputLegajo').value);
    expect(container.querySelector('#inputLegajo').type).toBe('text');
//    expect(container.querySelector('#inputLegajo')).toBe('123456');
});