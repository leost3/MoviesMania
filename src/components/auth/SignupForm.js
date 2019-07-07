import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

class SignupForm extends React.Component {
    state = {
      firstName: 'leo',
      lastName: 'studart',
      email: 'leo@studart',
      username: 'sa',
      password: 'sa',
      confirmPassword: 'sa',
    }
    handleFirstnameInput = (e) => {
      this.setState({...this.state, firstName:e.target.value});
    }

    handleLastNameInput = (e) => {
      this.setState({...this.state, lastName:e.target.value});
    }

    handleEmailInput = (e) => {
      this.setState({...this.state, email:e.target.value});
    }

    handleUsernameInput = (e) => {
      this.setState({...this.state, username:e.target.value});
    }
    handlePasswordInput = (e) => {
      this.setState({...this.state, password:e.target.value});
    }
    
    handleConfirmPasswordInput = e => {
      this.setState({...this.state, confirmPassword:e.target.value});
    }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log('Register form submited');
      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      axios.post(
        'http://localhost:8181/shoppingprojectphp/api/user.php',
        {
          action:"register",
          
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          email:this.state.email,
          username:this.state.username,
          password:this.state.password,
          confirmPassword:this.state.confirmPassword,
        },
        config
      )
      .then( response => {
        console.log(response)
        if (response.data.registration === 'created') {
          this.props.history.push(`/app/${this.state.username}`);
          this.props.handleLogin()
        } 
      })
      .catch( error => {
        console.log(error);
      });
    }
    render() {
        return (
          <div>
            <Link to="/">Home</Link>
              <form onSubmit={this.handleSubmit}>
                  <input className="" value={this.state.firstName} placeholder="username" type="text" onChange={this.handleFirstnameInput}/>
                  <input className="" value={this.state.lastName} placeholder="username" type="text" onChange={this.handleLastNameInput}/>
                  <input className="" value={this.state.email} placeholder="username" type="text" onChange={this.handleEmailInput}/>
                  <input className="" value={this.state.username} placeholder="username" type="text" onChange={this.handleUsernameInput}/>
                  <input className="" value={this.state.password} placeholder="password" type="text" onChange={this.handlePasswordInput}/>
                  <input className="" value={this.state.confirmPassword} placeholder="password" type="text" onChange={this.handleConfirmPasswordInput}/>
                  <button type="submit"> SignUp </button>
              </form>
          </div>
        )
    }
}

export default SignupForm;
