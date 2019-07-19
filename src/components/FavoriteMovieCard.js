import React from 'react';
import axios from 'axios';

function FavoriteMovieCard( props ) {
    const size = { 
        0: "w92",
        1: "w154",
        2: "w185",
        3: "w342",
        4: "w500",
        5: "w780",
        6: "original"
    };
    
    // if I want to implemente fifo - linked list
    const handleClick = () => {
        props.history.push(`/app/movies/${props.movie.id}`);
    }
    
    const removeFromFavorites = () => {
        const config = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
          };
          axios.post(
            'http://localhost:8181/shoppingprojectphp/api/movies.php',
            {
              "action": "removeFromFavorites",
              "userId": parseInt(props.favoriteMovies.userId),
              "movieId": parseInt(props.favoriteMovies.movieId)
            },
            config
          )
          .then( response => {
              console.log(response);
              props.updateFavoriteMovies()
            // this.setState({favoriteMovies:response.data.result});
          })
          .catch( error => {
            console.log(error);
          });
        }
    


    return (
        <div className=" " key={props.title} >
            {/* <Link to={`/app/username/${props.movie.title}`}> */}
                <img src={`http://image.tmdb.org/t/p/${size[3]}/${props.favoriteMovies.moviePosterPath}`}
                    alt={props.favoriteMovies.title} 
                    onClick={handleClick}
                />
                <h4>{props.favoriteMovies.title}</h4>
                <button onClick={removeFromFavorites}>TRASH</button>
            {/* </Link> */}
        </div>
    )
}

export default FavoriteMovieCard;
