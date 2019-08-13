import React from 'react';

export default function YoutubeVideoFrame({videoId}) {
  return (
    <div className='movieVideo'>
      <div className='ui embed'>
        <iframe
          className='iFrame'
          title='video player'
          src={`https://www.youtube.com/embed/${
            videoId
          }`}
        />
      </div>
    </div>
  );
}
