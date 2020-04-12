import React from 'react';
import { Link } from 'react-router-dom';

class Thanks extends React.Component {

    render() {
        return (
            <div id="thanks">
                <h1> </h1>
                <ul className="mobile-nav__items">
                    <li id="mobile-home" className="mobile-nav__item">
                        <Link to="/">Home</Link>
                    </li>
                    <li id="mobile-services" className="mobile-nav__item">
                        <Link to="/services">Services</Link>
                    </li>
                    <li className="mobile-nav__item">
                        <a href="#Pricing">Pricing</a>
                    </li>
                    <li className="mobile-nav__item">
                        <a href="#Contact">Contact</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Thanks;