import React,{Component} from "react";
import EditCreateRequest from "./components/request/EditCreateRequest";
import CreateRequest from "./components/request/CreateRequest";
import { Navbar } from "./components/navigation/NavBar";
import { NavbarAdmin } from "./components/navigation/NavBarAdmin"; 
import { SignIn } from "./components/signIn/SignIn";
import { HomeStudent } from "./components/home/HomeStudent";
import { Wrapper } from "./components/wrapper/Wrapper";
import { WrapperComponent } from "./components/wrapper/WrapperComponent";
import ViewStudent from "./components/viewAlumn/ViewStudent";
import { HomeAdmin } from "./components/home/HomeAdmin";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate
} from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import CommissionRequest from "./components/request/CommissionRequest";
import { ConfirmCode } from "./components/signIn/ConfirmCode";
import Students from "./components/students/Students";
import Configuration from "./components/configuration/Configuration";
import Dashoard from "./components/request/Dashboard";


class App extends Component {
    render(){
        return (

              <>
              <ThemeProvider
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              >
                 <BrowserRouter>
                    <Routes>
                        <Route path='/'  element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent student={<HomeStudent/>} admin={<Dashoard/>} navAdmin={<NavbarAdmin/>} navStudent={<Navbar/>}/>} />}/>
                        <Route path='/requests'  element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent student={<HomeStudent/>} admin={<HomeAdmin/>} navAdmin={<NavbarAdmin/>} navStudent={<Navbar/>}/>} />}/>
                        <Route path='/cupo' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent student={<CreateRequest encabezado='Solicitud de cupo para materias'/>} admin={<HomeAdmin/>} navAdmin={<NavbarAdmin/>} navStudent={<Navbar/>}/>} />}/>
                        <Route path='/cupo/edit' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent student={<EditCreateRequest encabezado='Editar de cupo para materias'/>} admin={<HomeAdmin/>} navAdmin={<NavbarAdmin/>} navStudent={<Navbar/>}/>} />}/>
                        <Route path='/requests/commissionRequest/:idcomision' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent  admin={<CommissionRequest></CommissionRequest>} navAdmin={<NavbarAdmin/>}/>} />}/>
                        <Route path='/student/:dni' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent admin={<ViewStudent></ViewStudent>} navAdmin={<NavbarAdmin/>}/>} />}/>
                        <Route path='/signIn' element={<SignIn/>}/>
                        <Route path='/cuenta/codigo/:codigo' element={<ConfirmCode/>}/>
                        <Route path='/students' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent  admin={<Students/>} encabezado="Alumnos" navAdmin={<NavbarAdmin/>} />} />} />
                        <Route path='/config' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent  admin={<Configuration/>} encabezado="Configuraciones" navAdmin={<NavbarAdmin/>} />} />} />                        
                    </Routes>
                  </BrowserRouter>
              </ThemeProvider>

                </>
      );
    }
}
export default App;
