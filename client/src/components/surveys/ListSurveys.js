import React from 'react';
import moment from 'moment';
import LoadingDuration from '../loading/LoadingDuration';
import { connect } from 'react-redux';
import { getSurveys } from '../../actions/surveys';
import ModalLarge from '../modal/ModalLarge';

class ListSurveys extends React.Component {
    constructor() {
        super();
        this.state = {
            openModal: false,
            currentSurvey: {}
        }
    }



    async componentDidMount() {
        await this.props.getSurveys();
    }

    loadSurvey = survey => {
        this.setState({ currentSurvey: survey, openModal: true });
    }

    render() {
        const { surveys } = this.props;
        const { openModal, currentSurvey } = this.state;
        return (
            <main className="">
                <LoadingDuration />
                {
                    openModal &&
                    <ModalLarge currentSurvey={currentSurvey} closeModal={() => this.setState({ openModal: false })}/>
                }
                <section className="features-surveys">
                    <div className="surveys__header">
                        <h1>List Surveys</h1>
                    </div>
                    <div className="surveys__body">
                        <ul className="list-surveys__items">
                            {
                                surveys.map(survey => {
                                    return (
                                        <li
                                            key={survey._id}
                                            className="list-surveys__item"
                                            onClick={e => {
                                                this.loadSurvey(survey);
                                            }}
                                            draggable={true}
                                        >
                                            {/* <i onClick={() => this.handleRemoveDraft(survey._id)} className="ti-close"></i> */}
                                            {/* <img loading={lazy} src={`https://robohash.org/${surveys._id}`} alt="surveys" /> */}
                                            <h4>{survey.title}</h4>
                                            <small>{moment(survey.created).fromNow()}</small>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        {
                            !surveys.length && <div>You don't have any survey</div>
                        }
                    </div>
                    <div className="surveys__image">

                    </div>

                </section>
            </main>
        )
    }
}

const mapPropsToState = state => {
    return { surveys: state.surveys };
}

export default connect(
    mapPropsToState,
    { getSurveys }
)(ListSurveys);