import axios from 'axios';


const login = axios.create({
    baseURL: 'http://localhost:8181/shoppingprojectphp/api/user.php',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default login;