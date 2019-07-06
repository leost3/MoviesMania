import React from 'react'
import { BrowserRouter as Router, Link, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';

function Home() {

    return (
        <div>
            <div>
                    <Link to='/app/leo'>goapp</Link>
                </div>
        
        </div>
    )
}

export default Home;
