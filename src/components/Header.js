import React from 'react'
import {Link} from 'react-router-dom';
import LoginForm from './auth/LoginForm';

function Header(props) {
    return (
        <div>
            <Link to="/signup">SignUp</Link>
            <Link to="/">Home</Link>
            <LoginForm {...props} handleLogin={props.handleLogin} getUserDetails={props.getUserDetails} loggedInStatus={props.loggedInStatus}/>
            Header
        </div>
    )
}

export default Header;
