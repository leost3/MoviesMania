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

    doPasswordValidation = () => {
      if (this.state.password === this.state.confirmPassword) return true;
    }


    handleSubmit = (e) => {
      e.preventDefault();

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
          <div className="signup_component">
          <Link to="/">Home</Link>
          <div className='signup'>
              <form className='sigupForm' onSubmit={this.handleSubmit}>
                  First Name<input className="" value={this.state.firstName} placeholder="first name" type="text" onChange={this.handleFirstnameInput}/>
                  Last Name<input className="" value={this.state.lastName} placeholder="last name" type="text" onChange={this.handleLastNameInput}/>
                  Email Address<input className="" value={this.state.email} placeholder="email" type="text" onChange={this.handleEmailInput}/>
                  Username<input className="" value={this.state.username} placeholder="username" type="text" onChange={this.handleUsernameInput}/>
                  Password<input className="" value={this.state.password} placeholder="password" type="text" onChange={this.handlePasswordInput}/>
                  Confirm Password<input className="" value={this.state.confirmPassword} placeholder="Confirm your password" type="text" onChange={this.handleConfirmPasswordInput}/>
                  <button type="submit"> SignUp </button>
              </form>
          </div>

          </div>
        )
    }
}

export default SignupForm;
