import React from 'react'
import axios from 'axios';
import MovieCard from './MovieCard';
import MoviesListHeader from './moviesListHeader';
import PostRequest from '../api/Database';
import Input from './Input';
import { withRouter } from 'react-router-dom';

class MoviesList extends React.Component{
// APIKEYIMDB = 7605e85c
// APIKEYTMDB = f94e9a18c1c262bae36e6cdc7be57a1d
// API Access Token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTRlOWExOGMxYzI2MmJhZTM2ZTZjZGM3YmU1N2ExZCIsInN1YiI6IjVkMjI0OTQ3NmQ0Yzk3MDAwZDc2NjMyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TnzHZaKOanrHPi6dIiIBeHjGtij20Cjdv1aHbl6zdq8
    state = {
        moviesList:[],
        filterMovies: [],
        moviesRatings: [],
        term: '',
    }
    
    async componentDidMount() {
        // const allTypes = 'all';
        // const series = 'series';
        console.log(this.props)
        const movies = 'movie';
        const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
        // const getMovieById = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;
        const getMovieByTrend = `https://api.themoviedb.org/3/trending/${movies}/day?api_key=${KEY}`;
        // const getConfig = `https://api.themoviedb.org/3/configuration?api_key=${KEY}`;
        const response = await axios(getMovieByTrend);
        console.log(response)
        // const configResp = await axios(getConfig);
        const data = response.data;
        this.setState({...this.state.moviesList, moviesList:data.results});
        this.getMovieGeneralRatingFromDb();
    }

    //This function is shared between MoviesList and MovieDetails components

    handleInputChange = (e) => {
        this.setState({term:e.target.value});
    }

    filterMovies = () => {
        return this.state.moviesList.filter(movie => {
            return movie.title.toLowerCase().includes(this.state.term.toLowerCase());
        })
    }
    // Get all ratings of customers
    getMovieGeneralRatingFromDb = () => {
        PostRequest.post('/user.php',
        {
          "action": "getAllRatings"
        },
      )
      .then( response => {
        this.setState({...this.state.moviesRatings, moviesRatings:response.data});
      })
      .catch( error => {
        console.log(error);
      });
    }

    renderMovies = () => {
        if (this.state.moviesList.length) {
            return (
                this.filterMovies().map(movie => (
                    <MovieCard  
                        {...this.props} 
                        movie={movie}
                        key={movie.id}
                    />
                ))
              
            )
        }
        // if state is empty, render Loader
        return (
            <div className="loader_container">
                <div className="loader">
                    <div className="outer"></div>
                    <div className="middle"></div>
                    <div className="inner"></div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="moviesListPage">
                <div className="movieList_header">
                    <MoviesListHeader {...this.props} />
                </div>
                <Input 
                    handleInputChange={this.handleInputChange}  
                    term={this.state.term}
                />
                <div className="moviesList">
                    {this.renderMovies()}
                </div>
            </div>
        )
    }
}


export default withRouter(MoviesList);
