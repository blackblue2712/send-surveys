import React from 'react';
import Modal from './Modal';
import moment from 'moment';
import { connect } from 'react-redux';
import { removeDraft } from '../../actions/surveys';

class ModalChooseSurveys extends React.Component {
    constructor() {
        super();
        this.childClicked = false;
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
        if(!this.childClicked) {
            this.props.closeModal();
            this.props.loadSurveyDraft(sid);
        }
    }

    handleRemoveDraft = async sid => {
        this.childClicked = true;
        await this.props.removeDraft(sid);
        this.childClicked = false;
    }

    renderBody = () => {
        const { surveys } = this.props;
        return (
            <>
                <div className="modal-list-surveys">
                    <ul className="modal-list-surveys__items">
                        { 
                            surveys.map(survey => {
                                return (
                                    <li
                                        key={survey._id}
                                        className="modal-list-surveys__item"
                                        onClick={ e => {
                                            this.loadSurveyDraft(survey._id);
                                        }}
                                        draggable={true}
                                    >
                                        <i onClick={() => this.handleRemoveDraft(survey._id)} className="ti-close"></i>
                                        <h4>{survey.name}</h4>
                                        <small>{moment(survey.created).fromNow()}</small>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        !surveys.length &&
                        <div style={{textAlign: "center", fontWeight: "bold"}}>
                            You don't have any survey backup
                        </div>
                    }
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

const mapStateToProps = state => {
    return { surveys: state.surveysDraft }
}

export default connect(
    mapStateToProps,
    { removeDraft }
)(ModalChooseSurveys);