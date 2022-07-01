import axios from 'axios'; 
import { getToken } from '../utils/auth';
var path = process.env.REACT_APP_BACK_URL_API


const createCourse = (course) => {
    const config = {
        headers:{
            Authorization: getToken(),
        }
    }
    let body = [course];
    return axios.post(`${path}/api/materias`,body, config)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err)))


}

const importCSVCourses = (courses) => {
    const config = {
        headers:{
            Authorization: getToken(),
        }
    }
    let body = courses;
    return axios.post(`${path}/api/materias`,body, config)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data)))
}

const deleteCourse = (code) => {
    const config = {
        headers:{
            Authorization: getToken(),
        }
    }
    return axios.delete(`${path}/api/materias?codigo=${code}`, config)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err)))
}

const importCSVCorrelatives = (correlatives) => {
    const config = {
        headers:{
            Authorization: getToken(),
        }
    }
    let result = [];
    let materias = [];
    correlatives.forEach(element => {
        if (!materias.includes(element.codigoMateria)) {
            materias.push(element.codigoMateria);
            let correlativas = []
            correlatives.forEach(c => {
                if (c.codigoMateria == element.codigoMateria) {
                    correlativas.push({codigoCorrelativa:c.codigoCorrelativa})
                } 
            })
            result.push({codigoMateria:element.codigoMateria,correlativas:correlativas}) 
        }
    }); 
    return axios.patch(`${path}/api/materias/correlativas`,result, config)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data)))
}

export {createCourse, deleteCourse, importCSVCourses, importCSVCorrelatives}