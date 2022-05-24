import React,{Component} from "react";
import Consult from "./components/request/Consult";
import CreateRequest from "./components/request/CreateRequest";
import Navbar from "./components/navigation/NavBar";
import { SignIn } from "./components/signIn/SignIn";
import Home from "./components/home/Home";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import ViewStudent from "./components/viewAlumn/ViewStudent";

class App extends Component {
    render(){
        return (

              <>
              <ThemeProvider
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              >
                 <BrowserRouter>
                    <Routes>
                        <Route path='/'  element={<Home></Home>} />
                        <Route path='/cupo' element={<CreateRequest encabezado='Solicitud de cupo para materias' legajo='' nroDocumento='' materias={[]}/>} />
                        <Route path='/consulta' element={<Consult></Consult>} />
                        <Route path='/student' element={<ViewStudent></ViewStudent>}/>
                        <Route path='/signIn' element={<SignIn/>}/>

                    </Routes>
                  </BrowserRouter>
              </ThemeProvider>

                </>
      );
    }
}
export default App;
