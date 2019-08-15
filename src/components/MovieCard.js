import React from 'react';
import size from './helpers/general';

function MovieCard(props) {
  const handleClick = () => {
    props.history.push(`/app/movies/${props.movie.id}`);
  };

  return (
    <div className='movieCard'>
      <img
        src={`http://image.tmdb.org/t/p/${size[3]}/${props.movie.poster_path}`}
        alt={props.movie.title}
        onClick={handleClick}
      />
      <h4>{props.movie.title}</h4>
    </div>
  );
}

export default MovieCard;
