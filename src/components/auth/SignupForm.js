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
      this.setState({[name]: value});
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
                            name="firstName" 
                            value={this.state.firstName} 
                            placeholder="first name" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Last Name
                        <input 
                            name="lastName" 
                            value={this.state.lastName} 
                            placeholder="last name" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Email Address
                        <input 
                            name="email" 
                            value={this.state.email} 
                            placeholder="email" 
                            type="email" 
                            onChange={this.handleInput}
                        />
                        Username
                        <input 
                            name="username" 
                            value={this.state.username} 
                            placeholder="username" 
                            type="text" 
                            onChange={this.handleInput}
                        />
                        Password
                        <input 
                            name="password" 
                            value={this.state.password} 
                            placeholder="password" 
                            type="password" 
                            onChange={this.handleInput}
                        />
                        Confirm Password
                        <input 
                            name="confirmPassword"  
                            value={this.state.confirmPassword} 
                            placeholder="Confirm your password" 
                            type="password" 
                            onChange={this.handleInput}
                        />
                        <button type="submit"> SignUp </button>
                    </form>
                    <p>{this.state.userAlreadyExists  ? "User already exists - Enter different Email/Username" : null}</p>
                    <p>{this.state.passwordsAreEqual  ? null : "Passwords don't match"}</p>
                    <p>{this.state.registerSuccessful ? "User has been registered" : null}</p>
                </div>
          </div>
        )
    }
}

export default withRouter(SignupForm);
