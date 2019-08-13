import React from 'react'

export default function PrograssBar({rating}) {
    return (
        <div className="pie-wrapper progress-half">
            {/* <span className="label">{this.state.movieRating.movie_rating}<em></em></span> */}
            <span className="label">{rating}<em></em></span>
            <div className="pie">
                <div className="left-side half-circle"></div>
                <div className="right-side half-circle"></div>
            </div>  
        </div>
    )
}

