import React from 'react';
import axios from 'axios';
import Buttons from './Buttons';
// import { Link } from 'react-router-dom';




class Movie extends React.Component {
    state = {
        movieDetails: {},
        userRating: null,
        userInfo: [],
        movieRating: {}
    }

    async componentDidMount() {
        const movieId = this.props.match.params.movieId;

        const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
        // const getMovieById = `https://api.themoviedb.org/3/movie/550?api_key=${KEY}`;
        const getMovieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`;

        const response = await axios(getMovieDetails);
        // const configResp = await axios(getConfig);
        const movieDetails = response.data;
        this.setState({...this.state.movieDetails, movieDetails});
        this.setStateUsersInfo(this.props.userInformation);
        this.getMovieGeneralRatingFromDb();
    }

    sendUserRating = () => {
        const config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        axios.post(
          'http://localhost:8181/shoppingprojectphp/api/movies.php',
          {
            "action": "rateMovie",
            // "action": "getGeneralRatings",
            "movieId": this.state.movieDetails.id,
            "userId": this.state.userInfo.userId,
            "userRate": this.state.userRating,
          },
          config
        )
        .then( response => {
            console.log(response.data)
            this.setState({...this.state.movieRating, movieRating:response.data.result});
        })
        .catch( error => {
          console.log(error);
        });
      }


    getMovieGeneralRatingFromDb = () => {
        const config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        axios.post(
          'http://localhost:8181/shoppingprojectphp/api/movies.php',
          {
            "action": "getRatings",
            // "action": "getGeneralRatings",
            "movieId": this.state.movieDetails.id,
            "userId": this.state.userInfo.userId,

          },
          config
        )
        .then( response => {
          // console.log(response);
          this.setState({...this.state, movieRating: response.data.result[0]});
        })
        .catch( error => {
          console.log(error);
        });
      }

    setStateUsersInfo = (userInfo) => {
        this.setState({...this.state.userInfo, userInfo});
    }

    setMovieRating = (rate) => {
        this.setState({userRating:parseInt(rate)});
        this.sendUserRating();
    }

    displayVotingBtns = () => {
        const btns  = []
        for (let i=0;i<=10;i++) {
            btns.push(
            <Buttons
                setMovieRating={this.setMovieRating} 
                hasUserRated={this.state.movieRating !== undefined ? true : false } 
                i={i} 
            />)
        }
        return (
            btns
        )
    }

    render() {
      console.log(this.state.movieRating);
        const size = { 
            0: "w92",
            1: "w154",
            2: "w185",
            3: "w342",
            4: "w500",
            5: "w780",
            6: "original"
        };
        const {id, title, overview, release_date, vote_average, poster_path} = this.state.movieDetails;
        if (this.state.movieDetails) {
            return (
                <div>
                    <img src={`http://image.tmdb.org/t/p/${size[3]}/${poster_path}`} alt={title} />
                    <button onClick={this.getMovieGeneralRatingFromDb} >GetRate</button>
                    <h1>{title}</h1>
                    <p>id: {id}</p>
                    <p>Overview: {overview}</p>
                    <h1>Release Date:{release_date}</h1>
                    <h1>Your Grade: {this.state.movieRating !== undefined ? this.state.movieRating.movie_rating : "Not voted"}</h1>
                    {/* <h1>General Grade: { this.state.movieRating.length ? this.state.movieRating[0].avg_rating : "null"}</h1>
                    <h1>Total Votes: {this.state.movieRating.length ? this.state.movieRating[0].num_of_rating : 'null'}</h1> */}
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
