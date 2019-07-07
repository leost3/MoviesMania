import React from 'react'
import {Link} from 'react-router-dom';

class MoviesList extends React.Component{
    render() {
        // console.log(this.props.loggedInStatus);
        return (
            <div>
                <Link to="/">Home</Link> <br/>
                User Status:  {this.props.loggedInStatus ? "Logged in" : "Logged Out"}
            </div>
        )
    }
}


export default MoviesList;
