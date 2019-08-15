import React from 'react';
import PostRequest from '../api/Database';
import { withRouter } from 'react-router-dom';

function FavoriteMovieCard(props) {
  const size = {
    0: 'w92',
    1: 'w154',
    2: 'w185',
    3: 'w342',
    4: 'w500',
    5: 'w780',
    6: 'original'
  };

  // if I want to implemente fifo - linked list
  const handleClick = () => {
    props.history.push(`/app/movies/${props.favoriteMovies.movieId}`);
  };

  const removeFromFavorites = () => {
    PostRequest
      .post(
        '/movies.php',
        {
          action: 'removeFromFavorites',
          userId: parseInt(props.favoriteMovies.userId),
          movieId: parseInt(props.favoriteMovies.movieId)
        },
      )
      .then(response => {
        props.updateFavoriteMovies();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='favoriteCard'>
      <img
        src={`http://image.tmdb.org/t/p/${size[3]}/${
          props.favoriteMovies.moviePosterPath
        }`}
        alt={props.favoriteMovies.title}
        onClick={handleClick}
      />
      <h4>{props.favoriteMovies.title}</h4>

      <button className='btn_delete' onClick={removeFromFavorites}>
        <i className='fas fa-trash'>REMOVE</i>
      </button>
    </div>
  );
}

export default withRouter(FavoriteMovieCard);
