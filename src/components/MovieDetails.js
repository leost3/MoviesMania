import React from 'react';
import axios from 'axios';
import Buttons from './Buttons';
// import { Link } from 'react-router-dom';




class Movie extends React.Component {
    state = {
        movieDetails: [],
        userRating: null,
        userInfo: []
    }

    async componentDidMount() {
        const movieId = this.props.match.params.movieId;

        const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
        // const getMovieById = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;
        const getMovieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`;

        const response = await axios(getMovieDetails);
        // const configResp = await axios(getConfig);
        const movieDetails = response.data;
        this.setState({...this.state.movieDetails, movieDetails})
        this.setStateUsersInfo(this.props.userInformation);
    }

    setStateUsersInfo = (userInfo) => {
        this.setState({...this.state.userInfo, userInfo});
    }

    setMovieRating = (rate) => {
        this.setState({userRating:parseInt(rate)});
    }

    displayVotingBtns = () => {
        const btns  = []
        for (let i=0;i<=10;i++) {
            btns.push(<Buttons setMovieRating={this.setMovieRating} i={i} />)
        }
        return (
            btns
        )
    }

    render() {
        const size = { 
            0: "w92",
            1: "w154",
            2: "w185",
            3: "w342",
            4: "w500",
            5: "w780",
            6: "original"
        };
        const {title, overview, release_date, vote_average, poster_path} = this.state.movieDetails;

        if (this.state.movieDetails) {
            return (
                <div>
                    <img src={`http://image.tmdb.org/t/p/${size[3]}/${poster_path}`} alt={title} />
                    <h1>{title}</h1>
                    <p>Overview: {overview}</p>
                    <h1>Release Date:{release_date}</h1>
                    <h1>Grade: {vote_average}</h1>
                    {this.displayVotingBtns()}
                </div>
    
            )
        }
        return (
            <svg viewBox="0 0 50 50">
                <circle className="ring" cx="25" cy="25" r="20"></circle>
                <circle className="ball" cx="25" cy="5" r="3.5"></circle>
            </svg>
        )
    }
}

export default Movie;
