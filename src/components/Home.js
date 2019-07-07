import React from 'react'
import {Link} from 'react-router-dom';
import LoginForm from './auth/LoginForm';

function Home(props) {

    return (
            <div>
                <LoginForm {...props}/>
                <Link to="/signup">SignUp</Link>
                <h1>Landing Page</h1>
            </div>
 
    )
}

export default Home;
