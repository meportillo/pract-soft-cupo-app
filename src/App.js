import React,{Component} from "react";
import Consult from "./components/request/Consult";
import CreateRequest from "./components/request/CreateRequest";
import Navbar from "./components/navigation/NavBar";
import SignIn from "./components/home/SignIn";
import Home from "./components/home/Home";
import {
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";

class App extends Component {
    render(){
        return (

              <>
              <ThemeProvider
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
              >
                <Navbar></Navbar>
                <Routes>
                    <Route path='/'  element={<Home></Home>} />
                    <Route path='cupo' element={<CreateRequest/>} />
                    <Route path='consulta' element={<Consult></Consult>} />
                    <Route path='sign-up' element={<SignIn></SignIn>} />
                </Routes>                
              </ThemeProvider>

                </>
      );
    }
}

export default App;
