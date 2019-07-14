import React from 'react'
import axios from 'axios';
import MovieCard from './MovieCard';

class MoviesList extends React.Component{
// APIKEYIMDB = 7605e85c
// APIKEYTMDB = f94e9a18c1c262bae36e6cdc7be57a1d
// API Access Token = eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOTRlOWExOGMxYzI2MmJhZTM2ZTZjZGM3YmU1N2ExZCIsInN1YiI6IjVkMjI0OTQ3NmQ0Yzk3MDAwZDc2NjMyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TnzHZaKOanrHPi6dIiIBeHjGtij20Cjdv1aHbl6zdq8
    state = {
        moviesList:[],
        moviesRatings: [],
    }
    
    async componentDidMount() {
        // const allTypes = 'all';
        // const series = 'series';
        
        const movies = 'movie';
        const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
        // const getMovieById = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;
        const getMovieByTrend = `https://api.themoviedb.org/3/trending/${movies}/day?api_key=${KEY}`;
        // const getConfig = `https://api.themoviedb.org/3/configuration?api_key=${KEY}`;
        const response = await axios(getMovieByTrend);
        // const configResp = await axios(getConfig);
        const data = response.data;
        this.setState({...this.state, moviesList:data.results});
    }

    // saveMoviesInDB = () => {
    //     const moviesObj = [];
    //     this.state.moviesList.map(movie => {
    //       moviesObj.push({
    //           "id" :movie.id,
    //           "title" :movie.title,
    //       })
    //     });

    //   const config = {
    //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //   };
    //   axios.post(
    //     'http://localhost:8181/shoppingprojectphp/api/postDb.php',
    //     {
    //       moviesInfo: moviesObj
    //     },
    //     config
    //   )
    //   .then( response => {
    //     console.log("resp", response) 
    //   })
    //   .catch( error => {
    //     console.log(error);
    //   });
    // }


    

    //This function is shared between MoviesList and MovieDetails components

    getMovieGeneralRatingFromDb = () => {
      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      axios.post(
        'http://localhost:8181/shoppingprojectphp/api/movies.php',
        {
          "action": "getGeneralRatings"
        },
        config
      )
      .then( response => {
        // console.log("resp", response.data);
        this.setState({...this.state.moviesRatings, moviesRatings:response.data});
      })
      .catch( error => {
        console.log(error);
      });
    }

    renderMovies = () => {
        // render movie list
        if (this.state.moviesList.length) {
            return (
                this.state.moviesList.map(movie => (
                    <div key={movie.id} alt={movie.title}  >
                        <h1><MovieCard  
                            {...this.props} 
                            movie={movie} 
                            getDetails={this.props.getDetails} 
                            />
                        </h1>
                    </div>
                ))
            )
        }
        // if state is empty, render Loader
        return (
            <div className="loader">
                <div className="outer"></div>
                <div className="middle"></div>
                <div className="inner"></div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.getMovieGeneralRatingFromDb}>sendToDB</button>
                User Status:  {this.props.loggedInStatus ? "Logged in" : "Logged Out"}
                {this.renderMovies()}
            </div>
        )
    }
}


export default MoviesList;
