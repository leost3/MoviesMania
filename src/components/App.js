import React from 'react';
import Home from './Home';
import Error from './Error';
import { BrowserRouter as Router, Switch, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignupForm from './auth/SignupForm';
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails';

class App extends React.Component {
 
  state = {
    isLoggedIn: true,
    detailedMovie: [],
  }

  componentDidMount() {
    
    console.log(localStorage)
    const isLoggedIn = (localStorage.getItem('loggedIn') === 'true' ? true : false);

      console.log('localstorage', isLoggedIn);
      this.setState({isLoggedIn});  
      console.log('state',this.state.isLoggedIn)
    }

  handleLogin = () => {
    this.setState({isLoggedIn: true});
  }

  getDetails = (movieDetails) => {
    console.log(movieDetails);
    this.setState({...this.state, detailedMovie: movieDetails});
  }

  render() {
    return (
        <div>
            <Router>
                <div>
                    <Link to="/">Home</Link>
                    <Switch>
                        {/* <Route path='/app/:appname' exact render={({match})=>(this.state.loggedIn ? ( <App params={match} />) : (< Redirect to='/' />))}/> */}
                        <Route path='/app/:appname' exact render={ props => (
                            <MoviesList {...props} loggedInStatus={this.state.isLoggedIn} getDetails={this.getDetails}/>
                        )} 
                        />
                         {/* <Route path='/app/:appname' exact render={ props => (
                           this.state.isLoggedIn ? ( <MoviesList {...props} loggedInStatus={this.state.isLoggedIn}/>) : ( <Redirect to="/" /> )
                        )}  */}
                        <Route path='/' exact strict render={ props => (
                            <Home  {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}  />
                        )} 
                        />
                        <Route path='/signup' render={ props => (
                            <SignupForm {...props} handleLogin={this.handleLogin} />
                        )} 
                        />
                        <Route path='/app/:username/:movie' render={ props => (
                            <MovieDetails {...props} handleLogin={this.handleLogin} movieDetails={this.state.detailedMovie } />
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