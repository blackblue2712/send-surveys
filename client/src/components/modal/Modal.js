import React from 'react';
import ReactDOM from 'react-dom';
import "./modal.css";

class Modal extends React.Component {
    constructor() {
        super();
        this.containerModal = React.createRef();
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
                <div
                    className="modal"
                    onClick={ e => e.stopPropagation() }
                >
                    <div className="modal-header">
                        <div className="modal-header__title">{this.props.titleHeader}</div>
                        <div className="modal-header__action">{this.props.actionHeader}</div>
                    </div>

                    <div className="modal-body">
                        {this.props.body}
                    </div>

                    <div className="modal-footer">
                        <div className="modal-footer__description">
                            {this.props.descriptionFooter}
                        </div>
                        <div className="modal-footer__action">
                            {this.props.actionFooter}
                        </div>
                    </div>
                </div>
            </div>,
            document.querySelector("#modal")
        )
    }
}

export default Modal;