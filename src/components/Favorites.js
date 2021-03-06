import React from 'react';
import FavoriteMovieCard from './FavoriteMovieCard';
import MoviesListHeader from './moviesListHeader';
import LoaderRed from './LoaderRed';
import PostRequest from '../api/Database';


class FavoritesList extends React.Component {
  state = {
    favoriteMovies: []
  };

  componentDidMount() {
    this.retrieveFavoriteMoviesFromDB();
  }

  retrieveFavoriteMoviesFromDB = () => {
    PostRequest
      .post('/movies.php', {
        action: 'getFavorites',
        userId: parseInt(this.props.userInformation.userId)
      })
      .then(response => {
        this.setState({ favoriteMovies: response.data.result });
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateFavoriteMovies = () => {
    this.retrieveFavoriteMoviesFromDB();
  };

  renderFavoriteMovies = () => {
    if (this.state.favoriteMovies.length) {
      return this.state.favoriteMovies.map(movie => (
        <FavoriteMovieCard
          favoriteMovies={movie}
          key={movie.movieId}
          updateFavoriteMovies={this.updateFavoriteMovies}
        />
      ));
    } else if (!this.state.favoriteMovies.length)  return <h1>Your List is Empty</h1>;

    return <LoaderRed />
  };

  render() {
    return (
      <div className='favoriteList__page'>
        <MoviesListHeader {...this.props} />
        <div className='favoriteList'>
          {this.renderFavoriteMovies()}
        </div>
      </div>
    );
  }
}

export default FavoritesList;
