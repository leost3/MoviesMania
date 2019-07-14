import React from 'react';
import Home from './Home';
import Error from './Error';
import { BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignupForm from './auth/SignupForm';
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails';
import Header from './Header';

class App extends React.Component {
 
  state = {
    isLoggedIn: false,
    detailedMovie: [],
    userInformation: {}
  }

  componentDidMount() {
    const isLoggedIn = (localStorage.getItem('loggedIn') === 'true' ? true : false);
    this.getUserDetails();
    this.setState({isLoggedIn}); 
  }

  handleLogin = () => {
    this.setState({isLoggedIn: true});
  }

  getMovieDetails = (detailedMovie) => {

    this.setState({...this.state.detailedMovie, detailedMovie});
  }

  getUserDetails = () => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    this.setState({userInformation: {userId, username}});

  }

  render() {
    return (
        <div>
            <Router>
                <div>
                    <Header handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} getUserDetails={this.getUserDetails}/>
                    <Switch>
                        {/* <Route path='/app/:appname' exact render={({match})=>(this.state.loggedIn ? ( <App params={match} />) : (< Redirect to='/' />))}/> */}
                        <Route path='/app/movies' exact render={ props => (
                           this.state.isLoggedIn ?
                           ( 
                            <MoviesList {...props} 
                              loggedInStatus={this.state.isLoggedIn} 
                              getMovieDetails={this.getDetails}
                            /> 
                            )
                            :
                            (
                              <Redirect to='/' />
                            )
                        )} 
                        />
                        <Route path='/' exact strict render={ props => (
                             this.state.isLoggedIn ?(<Redirect to='app/movies' />) : (<Home  {...props} loggedInStatus={this.state.isLoggedIn}  />) 
                        )} 
                        />
                        <Route path='/signup' render={ props => (
                            <SignupForm {...props} handleLogin={this.handleLogin} />
                        )} 
                        />
                        <Route path='/app/movies/:movieId' render={ props => (
                           this.state.isLoggedIn ? (
                              <MovieDetails {...props} 
                                handleLogin={this.handleLogin} 
                                movieDetails={this.state.detailedMovie } 
                                userInformation={this.state.userInformation}
                                />
                            ) : ( <Redirect to='/' />)
                        )} 
                        />
                        <Route component={Error} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

}

export default App;



// getList = () => {
//   // console.log("list")
//   if (this.state) {
//     let bodyFormData = new FormData();
//     bodyFormData.append("action", "list");
//     const config = {
//       headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//     };
//     axios.post(
//       'http://localhost:8181/shoppingprojectphp/api/cars.php', 
//       bodyFormData,
//       config
//     )
//     .then( response => {
//       // console.log(response.data);
//       this.setState({cars: response.data.result});
//     })
//     .catch( error => {
//       console.log(error);
//     });
//   }
// }