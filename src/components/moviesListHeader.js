import React from 'react';
import LoginForm from './auth/LoginForm';
import { withRouter } from 'react-router-dom';

const MoviesListHeader = ({userId, loggedInStatus, history}) => {
  const goToFavorites = () => {
    history.push(
      `/app/${userId}/favorites`
    );
  };

  const goToHome = () => {
    history.push(`/app/movies`);
  };

  return (
    <div className='navbar'>
      <div className='navLinks'>
        <button onClick={goToHome}>Home</button>
        <button onClick={goToFavorites}>Favorites</button>
      </div>
      <LoginForm loggedInStatus={loggedInStatus} />
    </div>
  );
};

export default withRouter(MoviesListHeader);
