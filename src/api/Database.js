import axios from 'axios';


const login = axios.create({
    baseURL: 'http://localhost:8181/MoviesManiaPHP/api/',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default login;