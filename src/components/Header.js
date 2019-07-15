import React from 'react'
import {Link} from 'react-router-dom';
import LoginForm from './auth/LoginForm';

function Header(props) {
    
    const renderSignUpComponent = () => {
        if (props.loggedInStatus) {
            return 
        }
        return (
            <Link to="/signup">SignUp</Link>
        )
    }

    return (
        <div>
            {renderSignUpComponent()}
            <Link to="/">Home</Link>
            <LoginForm {...props} handleLogin={props.handleLogin} getUserDetails={props.getUserDetails} loggedInStatus={props.loggedInStatus}/>
            Header
        </div>
    )
}

export default Header;
