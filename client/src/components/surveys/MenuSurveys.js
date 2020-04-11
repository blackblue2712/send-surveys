import React from 'react';
import { connect } from 'react-redux';
import { getSurveysDraft } from "../../actions/surveys";
import { Link } from 'react-router-dom';
import ModalChooseSurveys from '../modal/ModalChooseSurveys';

class MenuSurveys extends React.Component {
    state = {
        loadingSurveys: "",
        openModal: false
    }

    saveSurvey = () => {
        this.props.saveSurvey();
    }

    loadSurveys = async () => {
        this.setState({ loadingSurveys: "menu-surveys__item--loading" });

        if(!this.props.surveysDraft.length) {
            await this.props.getSurveysDraft();
        }

        setTimeout(() => {
            this.setState({ loadingSurveys: "", openModal: true });
        }, 300)
        
    }

    render() {
        const { loadingSurveys, openModal } = this.state;
        return (
            <div id="menu-surveys">
                {
                    openModal &&
                    <ModalChooseSurveys
                        closeModal={ () => this.setState({ openModal: false }) }
                        loadSurveyDraft={this.props.loadSurveyDraft}
                    />
                }
                <div className="menu-surveys__items">
                    <div
                        className="menu-surveys__item"
                        onClick={this.saveSurvey}
                    >
                        <i className="ti-save"></i>
                        <span> Save survey</span>
                    </div>
                    <div
                        className={`menu-surveys__item ${loadingSurveys}`}
                        onClick={this.loadSurveys}
                    >
                        <i className="ti-reload"></i>
                        <span> Load survey</span>
                    </div>
                    <Link to="/services/surveys" className="menu-surveys__item">
                        <i className="ti-layout-grid2"></i> 
                        <span> My surveys</span>
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { surveysDraft: state.surveysDraft }
}

export default connect(
    mapStateToProps,
    { getSurveysDraft }
)(MenuSurveys);
