import React from 'react'

class MoviesListHeader extends React.Component {

    goToFavorites = () => {
        this.props.history.push(`/app/${this.props.userInformation.userId}/favorites`);
    }

    render() {
        return (
            <div>
                <button onClick={this.goToFavorites}>
                    Favorites
                </button>
            </div>
        )
    }
}

export default MoviesListHeader;
