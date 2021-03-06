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
            currentSurvey: {},
            loading: true
        }
    }


    async componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000)
        await this.props.getSurveys();
    }

    loadSurvey = survey => {
        this.setState({ currentSurvey: survey, openModal: true });
    }

    render() {
        const { surveys } = this.props;
        const { openModal, currentSurvey, loading } = this.state;
        if(loading) {
            return <LoadingDuration />
        } else {

            return (
                <main className="">
                    
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
                                                <h4>{survey.title}</h4>
                                                <small>{moment(survey.created).fromNow()}</small>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {
                                !surveys.length && (
                                    <>
                                        <div>You don't have any survey</div>
                                        <button style={{borderRadius: "40px"}} className="btn btn-outline btn-green btn-bold btn__create-survey" onClick={() => this.props.history.push(`/services/create/${this.props.auth._id}`)} ></button>
                                    </>
                                )
                            }
                        </div>
                        <div className="surveys__image">
    
                        </div>
    
                    </section>
                </main>
            )
        }
    }
}

const mapPropsToState = state => {
    return { surveys: state.surveys, auth: state.auth };
}

export default connect(
    mapPropsToState,
    { getSurveys }
)(ListSurveys);