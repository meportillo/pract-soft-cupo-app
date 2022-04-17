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

class App extends Component {
    render(){
        return (
            <BrowserRouter>
                <Navbar></Navbar>
                <Routes>
                    <Route path='/'  Component={<Home/>} />
                    <Route path='cupo' Component={<CreateRequest/>} />
                    <Route path='consulta' Component={<Consult/>} />
                    <Route path='sign-up' Component={<SignIn/>} />
                </Routes>
            </BrowserRouter>
    );
    }
}

export default App;
