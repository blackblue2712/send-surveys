import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../images/logo-0.png';
import { connect } from 'react-redux';
import { fetchUser, logout } from '../actions';
import ModalLogin from './modal/ModalLogin';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            openModal: false,
            openDropdown: false
        }

        this.dropDownEl = React.createRef();
    }

    componentDidMount() {
        this.props.fetchUser();
        let whereami = this.props.location.pathname.split("/")[1];

        if(whereami) {
            Array.from(document.querySelectorAll(".main-nav__item")).forEach( el => el.classList.remove("youarehere"));
    
            try {
                document.getElementById(whereami).classList.add("youarehere");
            } catch(err) {
                console.log("route not defined")
            }
        }

    }

    componentDidUpdate() {
        // console.log("update")
        let whereami = this.props.location.pathname.split("/")[1];

        Array.from(document.querySelectorAll(".main-nav__item")).forEach( el => el.classList.remove("youarehere"));
        if(whereami) {
            try {
                document.getElementById(whereami).classList.add("youarehere");
            } catch(err) {
                console.log("route not defined")
            }
        }
    }

    logout = () => {
        this.props.logout();
        this.props.history.push("/")
    }

    openModalLogin = () => {
        this.setState({ openModal: !this.state.openModal });
    }

    handleLogout = () => {
        this.props.logout();
    }

    closeDropdown = () => {
        setTimeout(() => {
            this.dropDownEl.current.classList.remove("open");
            document.querySelector("#root").removeEventListener("click", this.closeDropdown);
        }, 0)
    }

    openDropdown = () => {
        !Array.from(this.dropDownEl.current.classList).includes("open") ? this.dropDownEl.current.classList.add("open")
                                                                        : this.dropDownEl.current.classList.remove("open")

        document.querySelector("#root").addEventListener("click", this.closeDropdown);
    }

    renderButtonAuth = () => {
        if (!this.props.auth) {
            return (
                <button className="btn btn-primary" onClick={this.openModalLogin}>
                    Signup
                </button>
            )
        }
        let { familyName, photo } = this.props.auth;
        return (
            <div onClick={this.openDropdown} className="dropdown main-nav__item__dropdown">
                <button className="btn btn-dropdown">
                    <img className="avatar" src={photo} alt="avt"/> {familyName}
                </button>

                <div ref={this.dropDownEl} className="dropdown-list">
                    <div className="dropdow-list__backdrop"></div>
                    <span className="dropdown-list__arrow"></span>
                    <ul className="dropdown-list__items">
                        <li className="dropdown-list__item">
                            <i className="ti-user"></i> &nbsp;Your Profile
                        </li>
                        <li onClick={() => this.props.history.push("/services/surveys")} className="dropdown-list__item">
                            <i className="ti-arrow-circle-right"></i> &nbsp;Your Surveys
                        </li>
                        <li className="dropdown-list__item dropdown-list__item--hr">
                            
                        </li>
                        <li
                            className="dropdown-list__item"
                            onClick={this.logout}
                        >
                            <i className="ti-power-off"></i> Sign me out
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        // console.log(this.props.auth)
        const { openModal } = this.state;
        return (
            <header>
                {openModal && <ModalLogin closeModal={() => this.setState({ openModal: false })} />}
                <div id="main-header">
                    <div className="main-nav">
                        <ul className="main-nav__items">
                            <li className="main-nav__item">
                                <Link to="/"><img src={Logo} alt="logo" className="main-nav__item--logo" /></Link>
                            </li>
                            <li id="services" className="main-nav__item">
                                <Link to="/services">Services</Link>
                            </li>
                            <li className="main-nav__item">
                                <a href="#Pricing">Pricing</a>
                            </li>
                            <li className="main-nav__item">
                                <a href="#Contact">Contact</a>
                            </li>
                            <li className="main-nav__item">
                                {this.renderButtonAuth()}
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(
    mapStateToProps,
    { fetchUser, logout }
)(withRouter(Header));