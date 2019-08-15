import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className='home'>
      <div className='slider'>
        <div className='slide current'>
          <div className='content'>
            <h1>Movies Mania</h1>
            <p>Find the best movies in the cinema!</p>
            <button>
              <Link
                to='/signup'
                style={{ textDecoration: 'none', color: 'whiteSmoke' }}
              >
                SignUp
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
