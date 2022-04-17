import React,{Component} from "react";
import Consult from "./components/request/Consult";
import CreateRequest from "./components/request/CreateRequest";
import Navbar from "./components/navigation/NavBar";
import SignIn from "./components/home/SignIn";
import Home from "./components/home/Home";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/'  element={<Home/>} />
                    <Route path='cupo' element={<CreateRequest/>} />
                    <Route path='consulta' element={<Consult/>} />
                    <Route path='sign-up' element={<SignIn/>} />
                </Routes>
            </BrowserRouter>
    );
    }
}

export default App;
