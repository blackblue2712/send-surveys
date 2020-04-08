import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Main from './Main';
import Services from './Services';

import "./app.css";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Header />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/services" component={Services} />
                    </Switch>
                <Footer />
            </Router>
        );
    }
}

export default App;