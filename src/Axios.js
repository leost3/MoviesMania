import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8181/shoppingprojectphp/post.php',
    timeout: 1000,
    headers: {'Content-Type': 'application/form-data'},
    data: ['asdasd']
    },
);

export default instance;