import React from 'react';
import Modal from './Modal';

class ModalLogin extends React.Component {
    

    handleLoginFacebook = () => {
        window.location = (`${process.env.REACT_APP_API_URL}/auth/facebook`);
    }

    handleLoginGoogle = () => {
        window.location = (`${process.env.REACT_APP_API_URL}/auth/google`);
    }

    renderTitleHeader = () => {
        return (
            <>
                <h3>LOGIN YOUR ACCOUNT</h3>
                <p>
                    By creating an account, you can access to send surveys for free and tracking 
                    who has responsedin realtime notification on slack.
                </p>
            </>
        )
    }

    renderActionHeader = () => {
        
    }

    renderBody = () => {
        return (
            <>
                <div className="body-left">
                    <label htmlFor="username">User name</label>
                    <input autoComplete={0} name="username" id="username" type="text"/>
                    <label htmlFor="password">Password</label>
                    <input name="password" id="password" type="password"/>
                </div>

                <div className="body-right">
                    <button onClick={this.handleLoginFacebook} className="btn btn-facebook">
                        <i className="ti-facebook"></i>&nbsp;
                        Facebook
                    </button>
                    <button onClick={this.handleLoginGoogle} className="btn btn-google">
                        <i className="ti-google"></i>&nbsp;
                        Google
                    </button>
                </div>
            </>
        )
    }

    renderDescriptionFooter = () => {
        return (
            <div className="help-text">
                By creating an account, you agree to Liars's
                <br />
                <strong> Community Guidelines</strong>
            </div>
        )
    }

    renderActionFooter = () => {
        return (
            <>
                <button className="btn btn-outline btn-green">Sign me in</button>
                <button onClick={this.props.closeModal} className="btn btn-outline btn-danger">Cancel</button>
            </>
        )
    }

    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
                titleHeader={this.renderTitleHeader()}
                actionHeader={this.renderActionHeader()}
                body={this.renderBody()}
                descriptionFooter={this.renderDescriptionFooter()}
                actionFooter={this.renderActionFooter()}
            />
        )
    }
}

export default ModalLogin;