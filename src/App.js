import React,{Component} from "react";
import Consult from "./components/request/Consult";
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
import TableCommission from "./components/request/TableCommission";



class App extends Component {
    render(){
        return (

              <>
              <ThemeProvider
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              >
                 <BrowserRouter>
                    <Routes>
                        <Route path='/'  element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent student={<HomeStudent/>} admin={<HomeAdmin/>} navAdmin={<NavbarAdmin/>} navStudent={<Navbar/>}/>} />}/>
                        <Route path='/cupo' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent student={<CreateRequest encabezado='Solicitud de cupo para materias'/>} admin={<HomeAdmin/>} navAdmin={<NavbarAdmin/>} navStudent={<Navbar/>}/>} />}/>
                        <Route path='/materiaRequest/:idMateria' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent  admin={<TableCommission></TableCommission>} navAdmin={<NavbarAdmin/>}/>} />}/>
                        <Route path='/student/:dni' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent admin={<ViewStudent></ViewStudent>} navAdmin={<NavbarAdmin/>}/>} />}/>
                        <Route path='/signIn' element={<SignIn/>}/>
                        <Route path='/cuenta/codigo/:codigo' element={<ConfirmCode/>}/>
                        <Route path='/commissionRequest/:id' element={<Wrapper navigate={<Navigate to='/signIn'/>} component={<WrapperComponent  admin={<CommissionRequest></CommissionRequest>} navAdmin={<NavbarAdmin/>}/>} />}/>
                    </Routes>
                  </BrowserRouter>
              </ThemeProvider>
              </>
      );
    }
}
export default App;
