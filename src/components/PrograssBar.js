import React from 'react';

export default function PrograssBar({ rating }) {
  return (
    <div className='pie-wrapper progress-half'>
      <span className='label'>
        {rating}
      </span>
      <div className='pie'>
        <div className='left-side half-circle' />
        <div className='right-side half-circle' />
      </div>
    </div>
  );
}
