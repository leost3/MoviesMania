import React from 'react';
import './App.css';
import axios from 'axios';
import Cars from './Cars';
class App extends React.Component {
// ICON ARCHIVE
  state = {
    login: false,
    cars: [],
  }
  

  // getPhp = () => {
  //   axios.get(`http://localhost:8181/shoppingprojectphp/api/demo.php`)
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  //     .catch(function (err) {
  //       console.log('error');
  //       console.log(err);
  //     });
  // };

    getList = () => {
      console.log("list")
      if (this.state) {
        let bodyFormData = new FormData();
        bodyFormData.append("action", "list");
        const config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        axios.post(
          // 'http://localhost:8181/shoppingprojectphp/api/user.php',
          'http://localhost:8181/shoppingprojectphp/api/cars.php', 
          bodyFormData,
          config
        )
        .then( response => {
          console.log(response.data);
          this.setState({cars: response.data.result});
        })
        .catch( error => {
          console.log(error);
        });
      }
    }

    postPhp = (e) => {
      console.log('form submited');
      e.preventDefault();
      
      let bodyFormData = new FormData();
      // bodyFormData.append("action", "list");
      bodyFormData.append("action", "login");
      bodyFormData.append("username", "sa");
      bodyFormData.append("password", "sa");

      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      axios.post(
        'http://localhost:8181/shoppingprojectphp/api/user.php',
        // 'http://localhost:8181/shoppingprojectphp/api/cars.php', 
        // bodyFormData,
        {
          data:"login",
          username:"sa",
          password:"sa",
        },
        config
      )
      .then( response => {
        // console.log(response.data.result);
        this.setState({login: response.data.result});
        console.log(this.state.login)
        if (this.state.login) {
          this.getList();
        }
      })
      .catch( error => {
        console.log(error);
      });


      // axios.post(
      //   'http://localhost:8181/shoppingprojectphp/post.php',{
      //   data: 'leo'
      //   },
      //   {
      //     headers: {
      //       'Content-type': 'multipart/form-data'
      //     }
      //   }
      // )
      // const config = {
      //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      // };  
      // axios.post(
      //   'http://localhost:8181/shoppingprojectphp/post.php', {
      //     data: {
      //       name: 'leo',
      //       email:'myemail@gmail'
      //     } 
      //   },
      //   config
      // )
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  };

  render() {
    return (
      <div className = 'mainText' >
        <h1> Just React!!</h1> 
        <form onSubmit={this.postPhp}>
          <button type="submit"> CLICK TO POST DATA </button>
        </form>
          {/* <button onClick = {this.getPhp}> CLICK TO GET DATA </button> */}
        <Cars carsList={this.state.cars}/>
      </div>
    );
  }
}

export default App;