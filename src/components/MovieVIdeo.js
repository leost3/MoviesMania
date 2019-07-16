import React from 'react'
import  youtube  from '../api/youtube';

class MovieVIdeo extends React.Component {


    state = {youTubeVideo: []}

    componentDidMount() {
        this.onTermSubmit();
    }

    onTermSubmit = async () => {
        const response = await youtube.get("/search", {
          params: {
            q: "Goku"
          }
        });
        this.setState({
          youTubeVideo: response.data.items[0],
        });
      };

      renderVideoFrame = () => {
          console.log(this.props)
          if (this.state.youTubeVideo.id != undefined) {
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
        console.log(this.state.youTubeVideo)
        return (
            <div>
                {this.renderVideoFrame()}
            </div>
        );
    }
}

export default MovieVIdeo;
