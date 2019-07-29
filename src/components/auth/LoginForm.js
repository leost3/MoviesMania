import React from 'react';
import axios from 'axios';

// import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: '',
        matchData: true
    }

    handleUsernameInput = (e) => {
      this.setState({...this.state, username:e.target.value})
    }
    handlePasswordInput = (e) => {
      this.setState({...this.state, password:e.target.value})
    }

    handleLogOut = () => {
      localStorage.clear();
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      axios.post(
        'http://localhost:8181/shoppingprojectphp/api/user.php',
        {
          action:"login",
          username:this.state.username,
          password:this.state.password,
        },
        config
      )
      .then( response => {
        console.log(response)
        if (response.data.result.isLoggedIn) {
          this.props.handleLogin(true);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("userId", response.data.result.userId);
          localStorage.setItem("username", response.data.result.username);
          this.props.getUserDetails();
          this.setState({username: response.data.result.username});
          // this.props.getUserDetails(response.data.result.userId,response.data.result.username);
          // this.props.history.push(`app/${this.state.username}`);
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
                    // onTouchMove={this.mouseLeave}
                  />
                  <input 
                    className="" 
                    value={this.state.password} 
                    placeholder="password" 
                    type="text" 
                    onChange={this.handlePasswordInput}/>
                  <button type="submit"> Login </button>
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
            {this.renderForm()}
          </div>
        )
    }
}

export default LoginForm;
