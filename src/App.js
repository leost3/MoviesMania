import React from 'react';
import './App.css';

class App extends React.Component {

  getPhp = () => {
    fetch(`http://localhost:8181/shoppingprojectphp/api/demo.php`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: 'test1',
        }),
      }).then(res => res.json())
      .then(response => {
        console.log("response: ")
        console.log(response)
      })
  }

  render() {
    return ( <
      div className = "mainText" >
      <
      h1 > Just React < /h1> <
      button onClick = {
        this.getPhp
      } >
      CLICK <
      /button> < /
      div >
    )
  }

}

export default App;