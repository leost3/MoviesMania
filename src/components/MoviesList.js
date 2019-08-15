import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import MoviesListHeader from './moviesListHeader';
import PostRequest from '../api/Database';
import Input from './Input';
import { withRouter } from 'react-router-dom';

class MoviesList extends React.Component {
  state = {
    moviesList: [],
    filterMovies: [],
    moviesRatings: [],
    term: ''
  };

  async componentDidMount() {
    // const allTypes = 'all';
    // const series = 'series';
    const movies = 'movie';
    const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
    // const getMovieById = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;
    const getMovieByTrend = `https://api.themoviedb.org/3/trending/${movies}/day?api_key=${KEY}`;
    // const getConfig = `https://api.themoviedb.org/3/configuration?api_key=${KEY}`;
    const response = await axios(getMovieByTrend);
    // const configResp = await axios(getConfig);
    const data = response.data;
    this.setState({ ...this.state.moviesList, moviesList: data.results });
    this.getMovieGeneralRatingFromDb();
  }

  //This function is shared between MoviesList and MovieDetails components

  handleInputChange = e => {
    this.setState({ term: e.target.value });
  };

  filterMovies = () => {
    return this.state.moviesList.filter(movie => {
      return movie.title.toLowerCase().includes(this.state.term.toLowerCase());
    });
  };
  // Get all ratings of customers
  getMovieGeneralRatingFromDb = () => {
    PostRequest.post('/user.php', {
      action: 'getAllRatings'
    })
      .then(response => {
        this.setState({
          ...this.state.moviesRatings,
          moviesRatings: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  renderMovies = () => {
    if (this.state.moviesList.length) {
      return this.filterMovies().map(movie => (
        <MovieCard {...this.props} movie={movie} key={movie.id} />
      ));
    }
    // if state is empty, render Loader
    return (
      <div className='loader_container'>
        <div className='loader'>
          <div className='outer' />
          <div className='middle' />
          <div className='inner' />
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className='moviesListPage'>
        <div className='movieList_header'>
          <MoviesListHeader 
            userId={this.props.userInformation.userId}
            loggedInStatus={this.props.loggedInStatus}
          />
        </div>
        <Input
          handleInputChange={this.handleInputChange}
          term={this.state.term}
        />
        <div className='moviesList'>{this.renderMovies()}</div>
      </div>
    );
  }
}

export default withRouter(MoviesList);
