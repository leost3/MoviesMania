import React from 'react';
import './App.css';
import Cars from './Cars';
import LoginForm from './LoginForm';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';

class App extends React.Component {
 
  state = {
    login: false,
    cars: [],
  }


  checkLogin = (status) => {
    if (status) {
      this.setState({login: status});
      this.getList();
    }
  }

  getList = () => {
    // console.log("list")
    if (this.state) {
      let bodyFormData = new FormData();
      bodyFormData.append("action", "list");
      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      axios.post(
        'http://localhost:8181/shoppingprojectphp/api/cars.php', 
        bodyFormData,
        config
      )
      .then( response => {
        // console.log(response.data);
        this.setState({cars: response.data.result});
      })
      .catch( error => {
        console.log(error);
      });
    }
  }

  render() {
    console.log(this.props.params.params.appname )
    return (
      <div className = '' >
       <Link to='/'>logout</Link>
       <h1> Just React!!Welcome {this.props.params.params.appname }</h1> 
        {/* <h2>Hello, this is {this.props.match.params.appname}</h2>  */}
        <LoginForm checkLogin={this.checkLogin} />
          {/* <button onClick = {this.getPhp}> CLICK TO GET DATA </button> */}
        <Cars carsList={this.state.cars}/>
      </div>
    );
  }
}

export default App;