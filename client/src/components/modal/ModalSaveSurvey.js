import React from 'react';
import Modal from './Modal';

class ModalSaveSurvey extends React.Component {

    handleLoginFacebook = () => {
        window.location = (`${process.env.REACT_APP_API_URL}/auth/facebook`);
    }

    handleLoginGoogle = () => {
        window.location = (`${process.env.REACT_APP_API_URL}/auth/google`);
    }

    renderTitleHeader = () => {
        return (
            <>
                <h3>SAVE YOUR SURVEY</h3>
                <p>
                    Your survey will be save into database then you can load it later
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
                    <label htmlFor="username">Survey Name</label>
                    <input autoComplete={0} name="username" id="username" type="text"/>
                </div>

                <div className="body-right">
                    
                </div>
            </>
        )
    }

    renderDescriptionFooter = () => {
        return (
            <div className="help-text">
                Also save recipients
                <br />
                <strong> Save for fast!</strong>
            </div>
        )
    }

    renderActionFooter = () => {
        return (
            <>
                <button
                    className="btn btn-outline btn-green"
                    onClick={this.props.saveSurvey}
                >Save</button>
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

export default ModalSaveSurvey;