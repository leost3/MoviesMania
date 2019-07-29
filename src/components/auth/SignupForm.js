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
      userAlreadyExists: false,
      passwordsAreEqual: true,
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
      axios.post(
        'http://localhost:8181/shoppingprojectphp/api/user.php',
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
        const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      if (this.doPasswordValidation()) {
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
          if (response.data.result === 'Created') {
              this.setState({registerSuccessful: true});
              setTimeout( () => {this.props.history.push(`/`)},3000);
          }else{
              console.log(response.data.split(" "));
              console.log(response.data.split(" ").includes('SQLSTATE[23000]:'));
              if (response.data.split(" ").includes('SQLSTATE[23000]:')) {
                  this.setState({userAlreadyExists: true});
              }
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
      console.log(this.props)
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
              <p>{this.state.userAlreadyExists ? "User already exists - Enter different Email/Username" : ""}</p>
              <p>{this.state.passwordsAreEqual ? "" : "Passwords don't match"}</p>
              <p>{this.state.registerSuccessful ? "User has been registered" : ""}</p>
          </div>

          </div>
        )
    }
}

export default SignupForm;
