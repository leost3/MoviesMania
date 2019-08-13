import axios from 'axios';


const PostRequest = axios.create({
    baseURL: 'http://localhost:8181/MoviesManiaPHP/api/',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default PostRequest;
