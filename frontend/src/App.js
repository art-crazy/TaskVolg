import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import Home from "./pages/Home";
import '@elastic/eui/dist/eui_theme_light.css';
import Details from "./pages/Details";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/details/:id" component={Details}/>
                <Route path="/post/" component={Home}/>
                <Route path="/redirect" component={Home}/>
                <Route exact path="" component={Home}/>
                <Redirect to=""/>
            </Switch>
        </Router>
    );
};

export default App;