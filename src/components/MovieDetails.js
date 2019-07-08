import React from 'react';
// import { Link } from 'react-router-dom';

function Movie(props) {
    console.log(props.movieDetails)
    return (
        <div>
            <h1>{props.movieDetails.title}</h1>
            <p>Overview: {props.movieDetails.overview}</p>
            <h1>Release Date:{props.movieDetails.release_date}</h1>
            <h1>Grade: {props.movieDetails.vote_average}</h1>
        </div>
    )
}

export default Movie;
