import React from 'react';
import Form from './Form';
import { withRouter } from 'react-router-dom';


import PostRequest from '../../api/Database';

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    // Check if username and password match with db
    matchData: true
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogOut = () => {
    // When user logs out all their information is lost
    localStorage.clear();
  };

  handleSubmit = e => {
    e.preventDefault();
    PostRequest.post('/user.php', {
      action: 'login',
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        if (response.data.result.isLoggedIn) {
          // Will do the login
          this.props.handleLogin(true);
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('userId', response.data.result.userId);
          localStorage.setItem('username', response.data.result.username);
          // If data matches - gets username and userid and updates state on App component
          this.props.getUserDetails();
          this.setState({ username: response.data.result.username });
        } else {
          this.setState({ matchData: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Form
          loggedInStatus={this.props.loggedInStatus}
          handleSubmit={this.handleSubmit}
          username={this.state.username}
          handleInput={this.handleInput}
          password={this.state.password}
          matchData={this.state.matchData}
          handleLogOut={this.handleLogOut}
        />
      </div>
    );
  }
}

export default withRouter(LoginForm);
