import React from 'react'
import LandingPage from './LandingPage';
import Header from './Header';
import { withRouter } from 'react-router-dom';

function Home({loggedInStatus, handleLogin, getUserDetails}) {



    return (
        <div>
            <Header
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
                getUserDetails={getUserDetails}
            />
            <LandingPage />
        </div>
    )
}

export default withRouter(Home);
