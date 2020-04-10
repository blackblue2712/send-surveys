import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Main from './Main';
import Surveys from './surveys/Surveys';
import CreateSurvey from './surveys/CreateSurvey';
import ListSurveys from './surveys/ListSurveys';


import "./app.css";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Header />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/services" component={Surveys} />
                        <Route exact path="/services/create/:uid" component={CreateSurvey} />

                        <Route exact path="/services/surveys/:uid" component={ListSurveys} />
                    </Switch>
                <Footer />
            </Router>
        );
    }
}

export default App;