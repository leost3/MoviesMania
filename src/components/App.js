import React from 'react';
import Home from './Home';
import Error from './Error';
import { Switch, Redirect } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import SignupForm from './auth/SignupForm';
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails';
import Favorites from './Favorites';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    detailedMovie: [],
    userInformation: null,
  };

  componentDidMount() {
    console.log(localStorage)
    const isLoggedIn =
      localStorage.getItem('loggedIn') === 'true' ? true : false;
    this.getUserDetails();
    this.setState({ isLoggedIn });
  }

  // On Login Form if user exists and password matched on DB login will be perfomed and user will be redirected
  handleLogin = (bool) => {
    this.setState({ isLoggedIn: bool });
    if (!bool) {
      localStorage.setItem('loggedIn', 'false');
      localStorage.setItem('userId', null);
      localStorage.setItem('username', null);
    }
  };

  getMovieDetails = detailedMovie => {
    this.setState({ ...this.state.detailedMovie, detailedMovie });
  };

  // Gets userId and username and updates state
  getUserDetails = () => {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    this.setState({ userInformation: { userId, username } });
  };

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path='/app/movies'
            render={() =>
              this.state.isLoggedIn ? (
                <MoviesList
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  getMovieDetails={this.getDetails}
                  userInformation={this.state.userInformation}
                />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/'
            exact
            strict
            render={() =>
              this.state.isLoggedIn ? (
                <Redirect to='app/movies' />
              ) : (
                <Home
                  loggedInStatus={this.state.isLoggedIn}
                  handleLogin={this.handleLogin}
                  getUserDetails={this.getUserDetails}
                />
              )
            }
          />
          {/* <Route exact path='/app/movies' component={}/> */}
          <Route
            path='/signup'
            render={() => <SignupForm handleLogin={this.handleLogin} />}
          />
          <Route
            path='/app/movies/:movieId'
            render={() =>
              this.state.isLoggedIn ? (
                <MovieDetails
                  handleLogin={this.handleLogin}
                  movieDetails={this.state.detailedMovie}
                  userInformation={this.state.userInformation}
                  loggedInStatus={this.state.isLoggedIn}
                />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route
            path='/app/:userid/favorites'
            render={() =>
              this.state.isLoggedIn ? (
                <Favorites
                  userInformation={this.state.userInformation}
                  loggedInStatus={this.state.isLoggedIn}
                />
              ) : (
                <Redirect to='/' />
              )
            }
          />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default App;
