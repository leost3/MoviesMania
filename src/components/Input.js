import React from 'react'

export default function Input({handleInputChange, term}) {
    return (
        <div className="inputSearch">
            <input type='text'
                onChange={handleInputChange}
                value={term}
            />
            <span className="bottom"></span>
            <span className="right"></span>
            <span className="top"></span>
            <span className="left"></span>
        </div>
    )
}
