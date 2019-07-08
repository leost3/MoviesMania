import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import Movie from './Movie';

class MoviesList extends React.Component{
// APIKEYIMDB = 7605e85c
// APIKEYTMDB = f94e9a18c1c262bae36e6cdc7be57a1d
// API Access Token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTRlOWExOGMxYzI2MmJhZTM2ZTZjZGM3YmU1N2ExZCIsInN1YiI6IjVkMjI0OTQ3NmQ0Yzk3MDAwZDc2NjMyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TnzHZaKOanrHPi6dIiIBeHjGtij20Cjdv1aHbl6zdq8
    state = {
        movies:[],
    }
    
    async componentDidMount() {
        // const allTypes = 'all';
        // const series = 'series';
        
        const movies = 'movie';
        const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
        // const getMovieById = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;
        const getMovieByTrend = `https://api.themoviedb.org/3/trending/${movies}/day?api_key=${KEY}`;
        const getConfig = `https://api.themoviedb.org/3/configuration?api_key=${KEY}`;
        const response = await axios(getMovieByTrend);
        const configResp = await axios(getConfig);
        const data = response.data;
        this.setState({...this.state, movies:data.results});
    }

    renderMovies = () => {
        // console.log(this.props.getDetails);
        return (
            this.state.movies.map(movie => (
                <div key={movie.id} alt={movie.title}  >
                    <h1><Movie movie={movie} {...this.props} getDetails={this.props.getDetails} /></h1>
                </div>
            ))
        )
    }
    render() {
        // console.log(this.state.movies);
        // console.log(this.renderMovies());
        return (
            <div>
                <Link to="/">Home</Link> <br/>
                User Status:  {this.props.loggedInStatus ? "Logged in" : "Logged Out"}
                {this.renderMovies()}

                
            </div>
        )
    }
}


export default MoviesList;
