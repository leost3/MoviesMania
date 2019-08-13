import React from 'react';
import Form from './Form';

import PostRequest from '../../api/Database';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        // Check if username and password matched with db
        matchData: true
    }

    handleUsernameInput = (e) => {
      this.setState({...this.state, username:e.target.value})
    }
    handlePasswordInput = (e) => {
      this.setState({...this.state, password:e.target.value})
    }
    handleLogOut = () => {
        // When user logs out all their information is lost
      localStorage.clear();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        PostRequest.post('/user.php', {
            "action":"login",
            "username":this.state.username,
            "password":this.state.password,
        })
        .then( response => {
         console.log(response)
             if (response.data.result.isLoggedIn) {
              //   Will do the login
             this.props.handleLogin(true);
             localStorage.setItem("loggedIn", true);
             localStorage.setItem("userId", response.data.result.userId);
             localStorage.setItem("username", response.data.result.username);
             // If data matches - gets username and userid and updates state on App component   
             this.props.getUserDetails();
             this.setState({username: response.data.result.username});
            }else {
                this.setState({matchData : false});
            } 
        })
        .catch( error => {
            console.log(error);
        });
    }

    renderForm = () => {
      if (!this.props.loggedInStatus) {
        return (
            <div className='login'>
                <form onSubmit={this.handleSubmit} className='loginForm'>
                    <input 
                        className="" 
                        value={this.state.username} 
                        placeholder="username" 
                        type="text" 
                        onChange={this.handleUsernameInput}
                    />
                    <input 
                        className="" 
                        value={this.state.password} 
                        placeholder="password" 
                        type="text" 
                        onChange={this.handlePasswordInput}/>
                    <button type="submit"> Sign In </button>
                </form>
                <p>{this.state.matchData ? "" : "Invalid Username/Password"}</p>
            </div>
        )
      }

      return (
          <div className="loginInformation">
              <form onSubmit={this.handleLogOut} className="loggedInForm" >
                  <h1>Welcome: {localStorage.username}</h1>
                  <button type="submit">  Logout </button>
              </form>
          </div>
        )
    }

    render() {
        return (
            <div>
                {/* {this.renderForm()} */}
                <Form 
                    loggedInStatus={this.props.loggedInStatus}
                    handleSubmit={this.handleSubmit}
                    username={this.state.username}
                    handleUsernameInput={this.handleUsernameInput}
                    password={this.state.password}
                    handlePasswordInput={this.handlePasswordInput}
                    matchData={this.state.matchData}
                    handleLogOut={this.handleLogOut}
                />
            </div>
        )
    }
}

export default LoginForm;
