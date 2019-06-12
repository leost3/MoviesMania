import React from 'react';
import './App.css';
import axios from 'axios';
import instance from './Axios';
class App extends React.Component {

  state = {me: "person"}
  // getPhp = () => {
  //   fetch(`http://localhost:8181/shoppingprojectphp/api/demo.php`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         content: 'test1'
  //       })
  //     })
  //     .then(res => res.json())
  //     .then(response => {
  //       console.log('response: ');
  //       console.log(response);
  //     });
  // };

  getPhp = () => {
    axios.get(`http://localhost:8181/shoppingprojectphp/api/demo.php`)
      .then((response) => {
        console.log(response.data)
      })
      .catch(function (err) {
        console.log('error');
        console.log(err);
      });
  };

  // options = {
  //   method: 'POST',
  //   headers: { 'content-type': 'application/form-data' },
  //   data: personForm,
  //   url: 'phpfile.php',
  // };

  postPhp = (e) => {
    e.preventDefault();

    // axios({
      //     method: 'get',
    //     headers: { 'content-type': 'application/form-data' },
    //     data: 'leo',
    //     url: {this.data},
    //   })
    //   .then(function (response) {
      //     console.log(response.data);
      //   })
      //   .catch(function (err) {
        //     console.log('error');
        //     console.log(err);
        //   });
        
      // const data = "leo";
      // axios.post(`http://localhost:8181/shoppingprojectphp/post.php?data=${data}`)
      // .then(function (response) {
      //   console.log(response.data);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
      console.log('form submited');
      const data = "leo";
      axios.post(`http://localhost:8181/shoppingprojectphp/post.php?data=${data}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  render() {
    return (
      <div className = 'mainText' >
        <h1> Just React!!</h1> 
        <form onSubmit={this.postPhp}>
          <button type="submit"> CLICK TO POST DATA </button>
        </form>
          {/* <button onClick = {this.getPhp}> CLICK TO GET DATA </button> */}
        </div>
    );
  }
}

export default App;