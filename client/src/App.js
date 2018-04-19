import React, { Component } from 'react';
import Home from './Home';

//Routing
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignupForm from './SignupForm';

class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/signup" component={SignupForm}/>
                </div>
            </Router>
        );
    }
}
export default App;
