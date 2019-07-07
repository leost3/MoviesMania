import React from 'react';
import axios from 'axios';

// import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {
    state = {
        username: 'sa',
        password: 'sa',
    }

    handleUsernameInput = (e) => {
      this.setState({...this.state, username:e.target.value})
    }
    handlePasswordInput = (e) => {
      this.setState({...this.state, password:e.target.value})
    }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log('form submited');
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
        // console.log(this.state);
    console.log(response.data.isLoggedIn);
    if (response.data.isLoggedIn) {
      this.props.handleLogin(response.data);
      this.props.history.push(`app/${this.state.username}`);
    } 
    })
    .catch( error => {
      console.log(error);
    });
    }
    
    render() {
        return (
          <div>
              <form onSubmit={this.handleSubmit}>
                  <input className="" value={this.state.username} placeholder="username" type="text" onChange={this.handleUsernameInput}/>
                  <input className="" value={this.state.password} placeholder="password" type="text" onChange={this.handlePasswordInput}/>
                  <button type="submit"> Login </button>
              </form>
          </div>
        )
    }
}

export default LoginForm
