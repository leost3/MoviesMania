import React from 'react';

class Buttons extends React.Component {
  state = { hasUserRated: false };

  rateMovie = e => {
    const movieRating = e.target.value;
    this.props.setMovieRating(movieRating);
  };

  renderBtn = () => {
    if (this.props.hasUserRated) {
      return (
        <div className='userHasRated'>
          <button
            disabled
            onClick={this.rateMovie}
            key={this.props.i}
            value={this.props.i}
          >
            {this.props.i}
          </button>
        </div>
      );
    }
    return (
      <div className='userHasNotRated'>
        <button onClick={this.rateMovie} value={this.props.i}>
          {this.props.i}
        </button>
      </div>
    );
  };

  render() {
    return <div className='VotingBtn'>{this.renderBtn()}</div>;
  }
}

export default Buttons;
