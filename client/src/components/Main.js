import React from 'react';
import SurveyImg from '../images/survey.png';
import Slack from '../images/slack.png';
import Node from '../images/node.png';
import Mongo from '../images/mongo.png';
import Reactjs from '../images/reactjs.png';
import Sendgrid from '../images/sendgrid.png';
import LoadingDuration from './loading/LoadingDuration';
import PushNotification from '../images/push_notification.gif';

class Main extends React.Component {
    state = {
        loading: true
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000)
    }
    render() {
        if(this.state.loading) {
            return <LoadingDuration /> 
        } else {

            return (
                <main>
                    <section id="introduce">
                        <div className="introduce-left">
                            <img src={SurveyImg} alt="survey" />
                        </div>
                        <div className="introduce-right">
                            <h1 className="introduce__title">SEND SURVEYS</h1>
                            <p className="introduce__description">
                                There are so many ways to get your surveys to the ideal audience. With <b>Liars Survey</b>, no one is too far away to reach.
                            </p>
                            <p className="introduce__description">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, necessitatibus?
                            </p>
                            <button className="btn btn-primary btn-large">
                                Learn More
                            </button>
                        </div>
                    </section>
    
                    <section id="features">
                        <div className="introduce-left">
                            <h1 className="introduce__title">AUTO NOTIFY</h1>
                            <p className="introduce__description">
                                Thanks to <b>Send grid</b> and <b>Slack incomming request webhook</b>
                                , the system can notify you in realtime on slack chanel.
                            </p>
                            <p className="introduce__description">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, necessitatibus?
                            </p>
                            <button onClick={() => {window.open("https://api.slack.com/messaging/webhooks", "__blank")}} className="btn btn-primary btn-large">
                                How to turn on notify
                            </button>
                        </div>
                        <div className="introduce-right">
                            <img src={PushNotification} alt="survey" />
                        </div>
                    </section>
                    
    
                    <section id="stack" style={{marginBottom: "10rem"}}>
                        <h1 className="introduce__title">Why Me?</h1>
                        <h3>Fast & Free</h3>
                        <p className="stack__description">Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                             Quos quisquam rem perferendis fugit vitae fugiat illum cumque explicabo deserunt dolorum.
                        </p>
                        <div className="stack-images">
                            <img src={Reactjs} alt="reactjs"/>
                            <img src={Mongo} alt="mongo"/>
                            <img src={Node} alt="node"/>
                            <img src={Slack} alt="slack"/>
                            <img src={Sendgrid} alt="sendgrid"/>
                        </div>
                    </section>
    
                </main>
            )
        }
    }
}

export default Main;