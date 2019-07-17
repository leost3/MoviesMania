import React from 'react';
import axios from 'axios';
import Buttons from './Buttons';
import { Link } from 'react-router-dom';
import MovieVideo from './MovieVIdeo';
import youtube from '../api/youtube';

class Movie extends React.Component {
    state = {
        movieDetails: {},
        // userRating: null,
        userInfo: [],
        movieRating: {},
        movieRateAvg: null,
        youTubeVideo: {},

    }

    async componentDidMount() {
        const movieId = this.props.match.params.movieId;

        const KEY = 'f94e9a18c1c262bae36e6cdc7be57a1d';
        // const getMovieById = `https://api.themoviedb.org/3/movie/${550}?api_key=${KEY}`;
        const getMovieDetails = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${KEY}`;

        const response = await axios(getMovieDetails);
        // const configResp = await axios(getConfig);
        const movieDetails = response.data;
        this.setState({...this.state.movieDetails, movieDetails});
        this.setState({userInfo:this.props.userInformation});
        this.getMovieAvg();
        this.getMovieGeneralRatingFromDb();
        this.onTermSubmit(this.state.movieDetails.title)
    }

    

    sendUserRating = (rate) => {
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
            "userRate": rate,
          },
          config
        )
        .then( response => {
            this.setState({...this.state.movieRating, movieRating:response.data.result[0]});
            this.getMovieAvg();
        })
        .catch( error => {
          console.log(error);
        });
      }

    getMovieAvg = () => {
      const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      };
      axios.post(
        'http://localhost:8181/shoppingprojectphp/api/movies.php',
        {
          "action": "getAvg",
          "movieId": this.state.movieDetails.id,
        },
        config
      )
      .then( response => {
        this.setState({movieRateAvg: parseFloat(response.data.result['AVG(movie_rating)'])});
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
            "movieId": this.state.movieDetails.id,
            "userId": this.state.userInfo.userId,
          },
          config
        )
        .then( response => {
          this.setState({...this.state, movieRating: response.data.result[0]});
        })
        .catch( error => {
          console.log(error);
        });
      }

    // setStateUsersInfo = (userInfo) => {
    //     this.setState({...this.state.userInfo, userInfo});
    // }

    setMovieRating = (rate) => {
        this.sendUserRating(parseInt(rate));
    }

    displayVotingBtns = () => {
        const btns  = []
        for (let i=0;i<=10;i++) {
            btns.push(
            <Buttons
                setMovieRating={this.setMovieRating} 
                hasUserRated={this.state.movieRating !== undefined ? true : false } 
                i={i} 
                key={i} 
            />)
        }
        return (
            btns
        )
    }

    renderRadialProgressBarUser = () => {
      if (this.state.movieRating !== undefined) {
        return (
          <div className="pie-wrapper progress-half">
            <span className="label">{this.state.movieRating.movie_rating}<em></em></span>
            <div className="pie">
              <div className="left-side half-circle"></div>
              <div className="right-side half-circle"></div>
            </div>  
          </div>
        )
      }
      return "Not voted";
    }
    renderRadialProgressBarGeneral = () => {
      if (this.state.movieRating !== undefined) {
        return (
          <div className="pie-wrapper progress-half">
            <span className="label">{this.state.movieRateAvg}<em></em></span>
            <div className="pie">
              <div className="left-side half-circle"></div>
              <div className="right-side half-circle"></div>
            </div>  
          </div>
        )
      }
      return "Not voted";
    }

    
    onTermSubmit = async (term) => {
      const response = await youtube.get("/search", {
        params: {
          q: term
        }
      });
      this.setState({
          ...this.state.youTubeVideo, youTubeVideo: response.data.items[0],
      });
    };

    renderVideoFrame = () => {
        if (this.state.youTubeVideo.id) {
            return (
                  <div>
                      <div className="ui embed">
                          <iframe title="video player" src={`https://www.youtube.com/embed/${this.state.youTubeVideo.id.videoId}`} />
                      </div>
                      <div className="ui segment">
                          
                      </div>
                  </div>
            )
        }
        return (
            <h1>Loading</h1>
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
        const {id, title, overview, release_date, backdrop_path} = this.state.movieDetails;
        // console.log(title);
        if (this.state.movieDetails) {
            return (
                <div className="movieDetails_page">
                  <Link to="/"> Back </Link>
                  <div>
                    <img className="moviePoster" src={`http://image.tmdb.org/t/p/${size[6]}/${backdrop_path}`} alt={title} />
                  </div>
                    {/* <button onClick={this.getMovieAvg} >GetRate</button> */}
                    <div className="movieDescription">
                      <h1>{title}</h1>
                      <p>id: {id}</p>
                      <p>Overview: {overview}</p>
                      <h1>Release Date:{release_date}</h1>
                    </div>
                    <div className="movieRatings">
                      <div>
                        <h1>Your Rating:</h1> {this.renderRadialProgressBarUser()}
                      </div>
                      <div>
                        <h1>Users average Rating:</h1> {this.renderRadialProgressBarGeneral()}
                      </div>
                    </div>
                    <div className="votingBtns">
                      {this.displayVotingBtns()}
                    </div>
                    <div className="movieVideo">
                      {this.renderVideoFrame()}
                      {/* <MovieVideo title={title} /> */}
                    </div>

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
