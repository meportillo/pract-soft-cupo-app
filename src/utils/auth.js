import jwt_decode from "jwt-decode";

const setToken = (token) => localStorage.setItem("jwt",JSON.stringify(token))

const isLogged = () => getToken() != null; 

const getTokenDecode = () => {
    const item = getToken();
    const token = item.split(" ")[1];
    return jwt_decode(token);
}

const getRol = () => {
    const token = getTokenDecode(); 
    return token.authorities[0];
}

const getUser = () => {
    const token = getTokenDecode();
    return token.alumno;
} 
const getToken = () => JSON.parse(localStorage.getItem("jwt"));

const isAdmin = () => {
    return getRol() != "ROLE_ALUMNO";
} 

export {isLogged,getUser,getRol,isAdmin,getToken,setToken};