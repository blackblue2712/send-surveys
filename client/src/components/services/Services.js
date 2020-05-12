import React from 'react';
import { connect } from 'react-redux';

import './Services.css';
import AVT from '../../images/ps.jpg';
import Rocket from '../../images/rocket.png';
import Slack from '../../images/slack-animate.gif';
import PushNotify from '../../images/push_notification.gif';
import ModalLogin from '../modal/ModalLogin';



class Services extends React.Component {

    state = {
        openModal: false
    }

    componentDidMount() {
        document.querySelector('footer').style.backgroundColor = "#242D33";
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
        let auth = this.props.auth;
        let { openModal } = this.state;
        return (
            <div id="services-section">
                {openModal && <ModalLogin closeModal={() => this.setState({ openModal: false })}/>}
                <div class="section-header">
                    <h1 className="title-section">Sending your survey</h1>
                    <button style={{borderRadius: "40px"}} className="btn btn-outline btn-green btn-bold btn__create-survey" onClick={this.checkLogin} ></button>
                </div>

                <div className="section-body">
                    <div className="bg-linear-top"></div>
                    <div className="bg-linear-bot"></div>

                    <div className="container">
                        <div className="info">
                            <div className="img">
                                <img src={AVT} alt="avt" />
                            </div>
                            <div className="status">
                                <div className="left">
                                    <p>Account Type</p>
                                    <span>Basic</span>
                                </div>
                                <div className="right">
                                    <p>Valid until</p>
                                    <span>Unlimited</span>
                                </div>
                            </div>
                        </div>

                        <div className="inner">
                            <div className="section-start">
                                <div className="introduce-services">
                                    <div className="d-flex">
                                        <img src={Rocket} alt="rocket" />
                                        <p>
                                            <h3>Send surveys </h3>
                                            <span>
                                                There are so many ways to get your surveys to the ideal audience
                                            </span>
                                        </p>
                                    </div>
                                    <a className="btn btn-green" href="#lear-more">Learn more</a>
                                </div>

                                <div className="introduce-services">
                                    <div className="d-flex">
                                        <img src={Slack} alt="rocket" />
                                        <p>
                                            <h3>Slack messages </h3>
                                            <span>
                                                Thanks to Send grid and Slack incomming request webhook, the system can notify you in realtime on slack chanel.
                                            </span>
                                        </p>
                                    </div>
                                    {/* <a className="btn btn-green" href="#lear-more">Learn more</a> */}
                                </div>

                                <div className="introduce-services">
                                    <div className="d-flex">
                                        <img src={PushNotify} alt="rocket" />
                                        <p>
                                            <h3>Push notifictaions </h3>
                                            <span>
                                                Need some help?
                                            </span>
                                        </p>
                                    </div>
                                    <a className="btn btn-green" target="_blank" rel="noopener noreferrer" href="https://api.slack.com/messaging/webhooks">How to turn it on</a>
                                </div>


                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-footer"></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return { auth: state.auth };
}

export default connect(
    mapStateToProps
)(Services);
