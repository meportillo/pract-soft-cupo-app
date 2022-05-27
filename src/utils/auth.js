const isLogged = () => localStorage.getItem("jwt") != null; 

const getToken = () => localStorage.getItem("jwt");

const getUser = () => localStorage.getItem("jwt");
export {isLogged,getUser};