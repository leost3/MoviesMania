import React from 'react';

export default function Input({ handleInputChange, term }) {
  return (
    <div className='inputSearch'>
      <input type='text' onChange={handleInputChange} value={term} />
      <span className='bottom' />
      <span className='right' />
      <span className='top' />
      <span className='left' />
    </div>
  );
}
