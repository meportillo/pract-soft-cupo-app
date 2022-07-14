import axios from 'axios'; 
import { getToken } from '../utils/auth';
var path = process.env.REACT_APP_BACK_URL_API

axios.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


const createCourse = (course) => {
    let body = [course];
    return axios.post(`${path}/api/materias`,body)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err)))


}

const importCSVCourses = (courses) => {
    let body = courses;
    return axios.post(`${path}/api/materias`,body)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err.response)))
}

const deleteCourse = (code) => {
    return axios.delete(`${path}/api/materias?codigo=${code}`)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err)))
}

const importCSVCorrelatives = (correlatives) => {
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
    return axios.patch(`${path}/api/materias/correlativas`,result)
    .then(res => new Promise((resolve,error)=>resolve(res)))
    .catch(err => new Promise((resolve,error)=>error(err.response.data)))
}

export {createCourse, deleteCourse, importCSVCourses, importCSVCorrelatives}