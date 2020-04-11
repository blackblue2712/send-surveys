import React from 'react';
import "./Surveys.css";
import { withRouter } from 'react-router-dom';
import Image from '../../images/sending-surveys-header-2x.png';
import SendSurveyDemo from '../../images/send-survey-demo.gif';
import Slack from '../../images/slack-animate.gif';
import { connect } from 'react-redux';
import ModalLogin from '../modal/ModalLogin';
import LoadingDuration from '../loading/LoadingDuration';

class Surveys extends React.Component {
    state = {
        openModal: false
    }

    checkLogin = () => {
        if(!this.props.auth) {
            this.setState({ openModal: true });
        } else {
            const { _id } = this.props.auth;
            this.props.history.push(`/services/create/${_id}`);
        }
    }


    render() {
        let { openModal } = this.state;
        return (
            <main className="">
                <LoadingDuration />
                {openModal && <ModalLogin closeModal={() => this.setState({ openModal: false })}/>}
                <section className="features-surveys">
                    <div className="surveys__header">
                        <h1>Send Surveys</h1>
                    </div>
                    <div className="surveys__body">
                        <p>
                            There are so many ways to get your surveys to the ideal audience. With <b>Liars Survey</b>, no one is too far away to reach.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, vitae?
                        </p>

                        <button
                            className="btn btn-outline btn-green btn-bold btn__create-survey"
                            onClick={this.checkLogin}
                        ></button>
                    </div>
                    <div className="surveys__image">
                        <img src={Image} alt="send-survey"/>
                    </div>

                </section>

                <section className="features-surveys">
                    <div className="surveys__header">
                        <h1>Load Draft</h1>
                    </div>
                    <div className="surveys__body">
                        <p>
                            Saving and loading a [draft] easily
                        </p>
                    </div>
                    <div className="surveys__image">
                        <img style={{maxWidth: "650px"}} src={SendSurveyDemo} alt="send-survey"/>
                    </div>
                </section>

                <section className="features-surveys">
                    <div className="surveys__header">
                        <h1>Realtime Notification</h1>
                    </div>
                    <div className="surveys__body">
                        <p>
                            Thanks to <b>Send grid</b> and <b>Slack incomming request webhook</b>, the system can notify you in realtime on slack chanel.
                        </p>
                    </div>
                    <div className="surveys__image">
                        <img style={{maxHeight: "300px"}} src={Slack} alt="send-survey"/>
                    </div>
                </section>

            </main>
        )
    }
}

const mapStateToProps = state => {
    return { auth: state.auth }
}

export default connect(
    mapStateToProps
)(withRouter(Surveys));