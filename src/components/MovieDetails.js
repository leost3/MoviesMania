import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

class Movie extends React.Component {
    state = {movieDetails: []}
    async componentDidMount() {
        const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
        // const getMovieById = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;
        const getMovieByTrend = `https://api.themoviedb.org/3/movie/${this.props.match.params.movieId}?api_key=${KEY}`;

        const response = await axios(getMovieByTrend);
        // const configResp = await axios(getConfig);
        const data = response.data;
        console.log(data);
    }

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
