import React from 'react'

class Buttons extends React.Component {

    state = {hasUserRated: false}


    componentDidMount() {
        // console.log(this.props.userAlreadyRated)
        // if (this.props.userAlreadyRated !== undefined) {
        //     this.setState({state: true})
        // }
    }

    rateMovie = e => {
        const movieRating = e.target.value;
        this.props.setMovieRating(movieRating);
        // this.setState({hasUserRated: true});
        // console.log(movieRating)
        // this.setState({...this.state, movieRating: 6})
        // console.log(this.state)
    }

    renderBtn = () => {
        
        if (this.props.hasUserRated) {
            return (
                <div className="userHasRated">
                       <button  disabled onClick={this.rateMovie} key={this.props.i} value={this.props.i}>{this.props.i}</button>
                </div>
            ) 
        }
        return (
            <div className="userHasNotRated">
                <button  onClick={this.rateMovie} value={this.props.i}>{this.props.i}</button>
            </div>
        ) 
    }

    render() {
        // console.log(this.state.hasUserRated)
        return (
            <div className="VotingBtn" >
                {this.renderBtn()}
            </div>
        )
    }
}

export default Buttons;
