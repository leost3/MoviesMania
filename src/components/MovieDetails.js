import React from 'react';
// import { Link } from 'react-router-dom';

class Movie extends React.Component {

    render() {

        console.log(this.props.match.params.movieId);
        return (
            <div>
                <h1>{this.props.movieDetails.title}</h1>
                <p>Overview: {this.props.movieDetails.overview}</p>
                <h1>Release Date:{this.props.movieDetails.release_date}</h1>
                <h1>Grade: {this.props.movieDetails.vote_average}</h1>
            </div>
        )
    }
}

export default Movie;
