import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import "./modal.css";

class ModalLarge extends React.Component {
    constructor() {
        super();
        this.containerModal = React.createRef();

        this.state = {
            series: [],
            options: {},
            title: "",
            body: "",
            subject: "",
            recipients: [],
            lastUpdate: 0,
            created: 0,
            _id: ""
        }
    }

    componentDidMount() {

    }


    handleCloseModal = () => {
        this.props.closeModal();
    }

    render() {
        return ReactDOM.createPortal(
            <div
                ref={this.containerModal} className="modal-container"
                onClick={this.handleCloseModal}
            >
                <div onClick={this.handleCloseModal} className="modal-close">
                    <i className="ti-angle-double-left"></i>
                </div>
                <div
                    className="modal-large"
                    onClick={e => e.stopPropagation()}
                >

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

                    <div className="modal-large-footer">
                        <div className="modal-large-footer__description">
                            {this.props.descriptionFooter}
                        </div>
                        <div className="modal-large-footer__action">
                            {this.props.actionFooter}
                        </div>
                    </div>
                </div>
            </div>,
            document.querySelector("#modal")
        )
    }
}

export default ModalLarge;