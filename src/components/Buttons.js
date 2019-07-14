import React from 'react'

class Buttons extends React.Component {


    rateMovie = (e) => {
        const movieRating = e.target.value;
        this.props.setMovieRating(movieRating);
        // console.log(movieRating)
        // this.setState({...this.state, movieRating: 6})
        // console.log(this.state)
    }

    render() {
        return <button onClick={this.rateMovie} value={this.props.i}>{this.props.i}</button>;
    }
}

export default Buttons;
