import axios from 'axios';


// const PostRequest = axios.create({
//     baseURL: 'http://localhost:8181/MoviesManiaPHP/api/',
//     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// });

// b88106b37adb81

// 77942ec1@us-cdbr-iron-east-02.cleardb.net

// heroku_93513e180063d28

const PostRequest = axios.create({
    baseURL: 'https://boiling-chamber-77712.herokuapp.com/api',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

export default PostRequest;
