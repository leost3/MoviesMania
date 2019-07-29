import React from 'react'
import LoginForm from './auth/LoginForm';

class MoviesListHeader extends React.Component {

    goToFavorites = () => {
        this.props.history.push(`/app/${this.props.userInformation.userId}/favorites`);
    }
    
    goToHome = () => {
        this.props.history.push(`/app/movies`);
    }

    render() {
        return (
            <div className='navbar'>
                {/* <div className="" style={{background : 'orangeRed'}}>
                    <h1>MY_LOGO</h1>
                </div> */}
                <div className="navLinks">
                    <button onClick={this.goToHome}>Home</button>
                    <button onClick={this.goToFavorites}>
                        Favorites
                    </button>
                    <button>Link2</button>
                    <button>Link3</button>
                </div>
                <LoginForm loggedInStatus={this.props.loggedInStatus} />
            </div>
        )
    }
}

export default MoviesListHeader;
