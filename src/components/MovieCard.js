import React from 'react';
import size from './helpers/general';

function MovieCard( props ) {
    // const size = { 
    //     0: "w92",
    //     1: "w154",
    //     2: "w185",
    //     3: "w342",
    //     4: "w500",
    //     5: "w780",
    //     6: "original"
    // };
    
    // if I want to implemente fifo - linked list

    const handleClick = () => {
        props.history.push(`/app/movies/${props.movie.id}`);
    }
    
    return (
        <div className="movieCard">
                <img 
                    src={`http://image.tmdb.org/t/p/${size[3]}/${props.movie.poster_path}`} 
                    alt={props.movie.title} 
                    onClick={handleClick} />
                <h4>{props.movie.title}</h4>
        </div>
    )
}

export default MovieCard;
