import React, { Component } from 'react';
import Home from './Home';

//Routing
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SignupForm from './SignupForm';

class App extends Component {

    render() {
        return (
            <Home/>
        );
    }
}
export default App;
