import React from 'react';
import Modal from './Modal';
import moment from 'moment';

class ModalChooseSurveys extends React.Component {

    handleLoginFacebook = () => {
        window.location = (`${process.env.REACT_APP_API_URL}/auth/facebook`);
    }

    handleLoginGoogle = () => {
        window.location = (`${process.env.REACT_APP_API_URL}/auth/google`);
    }

    renderTitleHeader = () => {
        return (
            <>
                <h3>CHOOSE SAVED SURVEYS</h3>
                <p>
                    Your survey will be save into database then you can load it later
                </p>
            </>
        )
    }

    renderActionHeader = () => {

    }

    loadSurveyDraft = sid => {
        this.props.loadSurveyDraft(sid);
    }

    renderBody = () => {
        const { surveys } = this.props;
        return (
            <>
                <div className="modal-list-surveys">
                    <ul className="modal-list-surveys__items">
                        {
                            surveys.length 
                            ? this.props.surveys.map(survey => {
                                return (
                                    <li
                                        key={survey._id}
                                        className="modal-list-surveys__item"
                                        onClick={() => {
                                            this.loadSurveyDraft(survey._id);
                                            this.props.closeModal()
                                        }}
                                    >
                                        <h4>{survey.name}</h4>
                                        <small>{moment(survey.created).fromNow()}</small>
                                    </li>
                                )
                            })
                            : <div style={{textAlign: "center", fontWeight: "bold"}}>
                                You don't have any survey backup
                             </div>
                        }
                    </ul>
                </div>
            </>
        )
    }

    renderDescriptionFooter = () => {

    }

    renderActionFooter = () => {
        
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

export default ModalChooseSurveys;