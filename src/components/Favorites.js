import React from 'react';
import axios from 'axios';


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
          console.log("resp", response.data);
        //   this.setState({...this.state.moviesRatings, moviesRatings:response.data});
        })
        .catch( error => {
          console.log(error);
        });
      }
    
    
    
    
    
    
    render() {
        return (
            <div>
                Favorites
            </div>
        )
    }
}

export default Favorites;
