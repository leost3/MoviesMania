import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Home from './components/Home';
import { BrowserRouter as Router, Link, NavLink, Redirect} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import LoginForm from './components/LoginForm';

class Index1 extends React.Component {

    state = {loggedIn: true}

    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Link to='/app/leo'>
                            login
                        </Link>
                        <Route path='/app/:appname' exact render={({match})=>(this.state.loggedIn ? ( <App params={match} />) : (< Redirect to='/' />))}/>
                        <Route path='/' exact strict component={Home} />
                        <Route path='/login' component={LoginForm} />
                    </div>
                </Router>
            </div>

        )
    }
}

export default Index1;

