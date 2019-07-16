import React from 'react';

function MovieCard(props) {
    // console.log(props)
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

    return (
        <div className="movieCard" >
            {/* <Link to={`/app/username/${props.movie.title}`}> */}
                <img src={`http://image.tmdb.org/t/p/${size[3]}/${props.movie.poster_path}`} alt={props.movie.title} onClick={handleClick} />
                <h4>{props.movie.title}</h4>
            {/* </Link> */}
        </div>
    )
}

export default MovieCard;
