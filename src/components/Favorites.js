import React from 'react';
import axios from 'axios';
import FavoriteMovieCard from './FavoriteMovieCard';
import MoviesListHeader from './moviesListHeader';

class FavoritesList extends React.Component {
    
    state = {
        favoriteMovies: [],
    }

    componentDidMount() {
        this.retrieveFavoriteMoviesFromDB();
      }

    retrieveFavoriteMoviesFromDB = () => {
        axios.post(
          'http://localhost:8181/shoppingprojectphp/api/movies.php',
          {
            "action": "getFavorites",
            "userId": parseInt(this.props.userInformation.userId)
          },
        )
        .then( response => {
          this.setState({favoriteMovies:response.data.result});
        })
        .catch( error => {
          console.log(error);
        });
      }

    updateFavoriteMovies = () => {
        this.retrieveFavoriteMoviesFromDB();
    }
        
    renderFavoriteMovies = () => {
        if (this.state.favoriteMovies.length) {
          return (
              this.state.favoriteMovies.map(movie => (
                  <FavoriteMovieCard  
                      {...this.props} 
                      favoriteMovies={movie}
                      key={movie.movieId}
                      updateFavoriteMovies={this.updateFavoriteMovies}
                  />
              ))
          )
      }
        return (
          <div className="loader_container">
            <div className="loader">
                <div className="outer"></div>
                <div className="middle"></div>
                <div className="inner"></div>
            </div>
          </div>
        )
    }
    
    
    render() {
        return (
          <div className="favoriteList__page">
              <MoviesListHeader {...this.props} /> 
              <div className="favoriteList">
                  {/* <movieListHeader /> */}
                  {this.renderFavoriteMovies()}
              </div>
          </div>
        )
    }
}

export default FavoritesList;
