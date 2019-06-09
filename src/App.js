import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
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


  postPhp = () => {
    axios({
        method: 'post',
        url: 'http://localhost:8181/shoppingprojectphp/post.php',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log('error');
        console.log(err);
      });
    // axios
    //   .post(`http://localhost:8181/shoppingprojectphp/post.php`, this.data = {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone'
    //   })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (err) {
    //     console.log('error');
    //     console.log(err);
    //   });
  };

  render() {
    return ( <
      div className = 'mainText' >
      <
      h1 > Just React!! < /h1> <
      button onClick = {
        this.getPhp
      } > CLICK TO GET DATA < /button> <
      button onClick = {
        this.postPhp
      } > CLICK TO POST DATA < /button> < /
      div >
    );
  }
}

export default App;