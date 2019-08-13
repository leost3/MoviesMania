import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PostRequest from '../../api/Database';

class SignupForm extends React.Component {
    state = {
      firstName: 'leo',
      lastName: 'studart',
      email: 'leo@studart',
      username: 'sa',
      password: 'sa',
      confirmPassword: 'sa',
      userAlreadyExists: false,
      passwordsAreEqual: true,
    }


    handleInput = e => {
      const {name, value} = e.target;
      console.log(name)
      this.setState({})
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

    userNameAlreadyExists = () => {
        PostRequest.post('/user.php',
        {
          action:"validate",
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          email:this.state.email,
          username:this.state.username,
          password:this.state.password,
          confirmPassword:this.state.confirmPassword,
          registerSuccessful: false
        },
      )
      .then( response => {
        console.log(response)
      })
      .catch( error => {
        console.log(error);
      });
    }


    handleSubmit = (e) => {
      e.preventDefault();
        this.setState({passwordsAreEqual : true});
        this.setState({userAlreadyExists : false});
        if (this.doPasswordValidation()) {
            PostRequest.post('/user.php',
            {
              action:"register",
              firstName:this.state.firstName,
              lastName:this.state.lastName,
              email:this.state.email,
              username:this.state.username,
              password:this.state.password,
              confirmPassword:this.state.confirmPassword,
            }
          )
          .then( response => {
              if (response.data.result === 'Created') {
                  this.setState({registerSuccessful: true});
                  setTimeout( () => {this.props.history.push(`/`)},3000);
              }else if (response.data.split(" ").includes('SQLSTATE[23000]:')) {
                  this.setState({userAlreadyExists: true});
              }
          })
          .catch( error => {
              console.log(error);
          });
        }else {
          this.setState({passwordsAreEqual: false})
        }
    }
    render() {
        return (
            <div className="signup_component">
                <Link to="/">Home</Link>
                <div className='signup'>
                    <form className='sigupForm' onSubmit={this.handleSubmit}>
                        First Name
                        <input 
                            className="" 
                            value={this.state.firstName} 
                            placeholder="first name" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Last Name
                        <input 
                            className="" 
                            value={this.state.lastName} 
                            placeholder="last name" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Email Address
                        <input 
                            className="" 
                            value={this.state.email} 
                            placeholder="email" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Username
                        <input 
                            className="" 
                            value={this.state.username} 
                            placeholder="username" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Password
                        <input 
                            className="" 
                            value={this.state.password} 
                            placeholder="password" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Confirm Password
                        <input 
                            className=""  
                            value={this.state.confirmPassword} 
                            placeholder="Confirm your password" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        <button type="submit"> SignUp </button>
                    </form>
                    <p>{this.state.userAlreadyExists ? "User already exists - Enter different Email/Username" : ""}</p>
                    <p>{this.state.passwordsAreEqual ? "" : "Passwords don't match"}</p>
                    <p>{this.state.registerSuccessful ? "User has been registered" : ""}</p>
                </div>
          </div>
        )
    }
}

export default withRouter(SignupForm);
