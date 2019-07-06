import React from 'react'
import axios from 'axios';

class LoginForm extends React.Component {
    state = {
        login: false,
    }
    

    postPhp = (e) => {
        console.log('form submited');
        e.preventDefault();
      
        const config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        axios.post(
          'http://localhost:8181/shoppingprojectphp/api/user.php',
          {
            data:"login",
            username:"sa",
            password:"sa",
          },
          config
        )
        .then( response => {
            this.props.checkLogin(response.data.response);
        })
        .catch( error => {
          console.log(error);
        });
      }
    render() {
        return (
         <div>
            <form onSubmit={this.postPhp}>
                <input className="" type="text"/>
                <input className="" type="text"/>
                <button type="submit"> CLICK TO POST DATA </button>
            </form>
         </div>
        )
    }
}

export default LoginForm
