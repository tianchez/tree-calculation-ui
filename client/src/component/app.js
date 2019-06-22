import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


import TreeComponent from './tree/treeComponent.jsx';
import SigninComponent from './signin/signinComponent.jsx';
import SignupComponent from './signup/signupComponent.jsx';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: ""
        };
    }

    render () {
        const PrivateRoute = ({ isLoggedIn, ...props }) =>
        isLoggedIn
            ? <Route { ...props } />
            : <Redirect to="/signin" />

        return (
            <Router>
                <Switch>
                    <Route path="/tree" component={TreeComponent} />
                    <Route exact path="/" render={() => (<Redirect to="/tree" />)}/>
                    <Route path="/signin" component={SigninComponent} />
                    <Route path="/signup" component={SignupComponent} />
                </Switch>
            </Router>
        );
    }

    getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
}

export default App;