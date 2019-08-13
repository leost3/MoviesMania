import React from 'react'

export default function FavoriteButton({isFavorite, addToFavorites,title}) {
    if (!isFavorite) {
        return (
            <div className="btnIsNotFavorite">
              <button onClick={addToFavorites}> 
                <i className="fas fa-star"></i>
              </button>
              <p> Add <span className='movieTitle'>{title}</span> to your favorite list</p>
              {/* <p> Add <span className='movieTitle'>{this.state.movieDetails.title}</span> to your favorite list</p> */}
            </div>
        )
    }
    return (
        <div className="btnIsFavorite">
            <i className="fas fa-star"></i> 
            <p> {title} is in your favorite list</p>
        </div>
    )
}

