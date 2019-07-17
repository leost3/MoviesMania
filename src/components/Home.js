import React from 'react'
import LandingPage from './LandingPage';
import Header from './Header';

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

export default Home;
