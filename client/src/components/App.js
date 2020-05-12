import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';
// import Surveys from './surveys/Surveys';

import Services from './services/Services';
import CreateSurvey from './surveys/CreateSurvey';
import ListSurveys from './surveys/ListSurveys';
import PageNotFound from './404';
import Thanks from './Thanks';

// import Test from './Test';

import "./app.css";
import "./responsive.css";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={Services} />
                    <Route exact path="/services" component={Services} />

                    <Route exact path="/services/create/:uid" component={CreateSurvey} />
                    <PrivateRoute exact path="/services/surveys" component={ListSurveys} />
                    <Route exact path="/services/surveys/:sid/:choice/:owner" component={Thanks} />

                    {/* <Route exact path="/test" component={Test} /> */}

                    <Route component={PageNotFound} />
                </Switch>
                <Footer />
            </Router>
        );
    }
}


export default App;