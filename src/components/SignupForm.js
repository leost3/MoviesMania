import React from 'react'
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    state = {
        username: 'leo@',
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
      this.props.handleLogin(e);
      this.props.history.push(`/app/${this.state.username}`);
    }
    
    render() {
        return (
          <div>
            <Link to="/">Home</Link>
              <form onSubmit={this.handleSubmit}>
                  <input className="" value={this.state.username} placeholder="username" type="text" onChange={this.handleUsernameInput}/>
                  <input className="" value={this.state.password} placeholder="confirm password" type="text" onChange={this.handlePasswordInput}/>
                  <input className="" value={this.state.password} placeholder="confirm password" type="text" onChange={this.handlePasswordInput}/>
                  <button type="submit"> Login </button>
              </form>
          </div>
        )
    }
}

export default Signup;
