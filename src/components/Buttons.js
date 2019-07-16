import React from 'react'

class Buttons extends React.Component {

    state = {hasUserRated: false}


    componentDidMount() {
        // console.log(this.props.userAlreadyRated)
        // if (this.props.userAlreadyRated !== undefined) {
        //     this.setState({state: true})
        // }
    }

    rateMovie = (e) => {
        const movieRating = e.target.value;
        this.props.setMovieRating(movieRating);
        // this.setState({hasUserRated: true});
        // console.log(movieRating)
        // this.setState({...this.state, movieRating: 6})
        // console.log(this.state)
    }

    renderBtn = () => {
        
        if (this.props.hasUserRated) {
            return <button  disabled onClick={this.rateMovie} value={this.props.i}>{this.props.i}</button>;
        }
        return <button  onClick={this.rateMovie} value={this.props.i}>{this.props.i}</button>;
    }

    render() {
        // console.log(this.state.hasUserRated)
        return (
            <div>
                {this.renderBtn()}
            </div>
        )
    }
}

export default Buttons;
