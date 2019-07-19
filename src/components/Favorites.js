import React from 'react';
import axios from 'axios';
import FavoriteMovieCard from './FavoriteMovieCard';

class Favorites extends React.Component {
    
    state = {
        favoriteMovies: [],
    }

    componentDidMount() {
        this.retrieveFavoriteMoviesFromDB();
      }

    retrieveFavoriteMoviesFromDB = () => {
        const config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        axios.post(
          'http://localhost:8181/shoppingprojectphp/api/movies.php',
          {
            "action": "getFavorites",
            "userId": parseInt(this.props.userInformation.userId)
          },
          config
        )
        .then( response => {
          this.setState({favoriteMovies:response.data.result});
        })
        .catch( error => {
          console.log(error);
        });
      }
        
    renderFavoriteMovies = () => {
       if (this.state.favoriteMovies.length) {
        return (
            this.state.favoriteMovies.map(movie => (
                <FavoriteMovieCard  
                    {...this.props} 
                    favoriteMovies={movie}
                    key={movie.id}
                />
            ))
        )
    }
    return (
      <h1>Loading....</h1>
    )
    }
    
    
    render() {
        return (
            <div>
                {this.renderFavoriteMovies()}
            </div>
        )
    }
}

export default Favorites;
