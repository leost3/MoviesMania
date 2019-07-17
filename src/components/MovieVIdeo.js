import React from 'react'
import  youtube  from '../api/youtube';
import { async } from 'q';

class MovieVIdeo extends React.Component {

    state = {
        youTubeVideo: {},
        movieTitle: ""
    }

    componentDidMount() {
        console.log("component mounted");
        this.setState({movieTitle: "goku"})
        this.onTermSubmit(this.props.title);
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
                            <h4 className="ui header"> {this.state.youTubeVideo.snippet.title} </h4>
                            <p>{this.state.youTubeVideo.snippet.description}</p>
                        </div>
                    </div>
              )
          }
          return (
              <h1>Loading</h1>
          )
      }

    render() {
        return (
            <div>
                {this.renderVideoFrame()}
            </div>
        );
    }
}

export default MovieVIdeo;
