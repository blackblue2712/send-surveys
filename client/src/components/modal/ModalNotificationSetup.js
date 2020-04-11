import React from 'react';
import Modal from './Modal';
import { connect } from 'react-redux';
import { settingSlackWebhookUrl } from '../../actions/notify';
import Notify from '../notify/Notify';

class ModalSaveSurvey extends React.Component {
    constructor() {
        super();
        this.nameInput = React.createRef();

        this.state = {
            notify: false,
            loading: ""
        }
    }

    renderTitleHeader = () => {
        return (
            <>
                <h3>Notification setup</h3>
                <p>
                    Realtime notify on your slack chanel when someone respose your survey.
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
                    <label htmlFor="slack_incomming_webhook">Slack incomming webhook url</label>
                    <input
                        ref={this.nameInput}
                        autoComplete={0}
                        name="slack_incomming_webhook" id="slack_incomming_webhook" type="text"
                        placeholder={window.localStorage.getItem("LIARS_SURVEY_SLACK_WEBHOOK_URL") || "paste link here"}
                    />
                </div>

                <div className="body-right">

                </div>
            </>
        )
    }

    renderDescriptionFooter = () => {
        return (
            <div className="help-text">
                Don't know about Slack incomming webhook url?
                <br />
                <a target="__blank" href="https://api.slack.com/messaging/webhooks"><strong> Click here</strong></a>
            </div>
        )
    }

    saveWebhookURL = async () => {
        this.setState({ loading: "open" });
        const url = this.nameInput.current.value;
        const response = await settingSlackWebhookUrl(url);
        console.log(response)

        this.setState({
            loading: "",
            notify: { content: response.data.message, stats: response.data.status }
        });

        setTimeout(() => {
            this.setState({ notify: false })
        }, 4500);

        if(response.data.statusCode === 200) {
            window.localStorage.setItem("LIARS_SURVEY_SLACK_WEBHOOK_URL", url);
        }
    }

    renderActionFooter = () => {
        return (
            <>
                <button
                    className="btn btn-outline btn-green"
                    onClick={this.saveWebhookURL}
                >Save</button>
                <button onClick={this.props.closeModal} className="btn btn-outline btn-danger">Cancel</button>
            </>
        )
    }

    render() {
        const { notify, loading } = this.state;
        return (
            <>
                {
                    notify &&
                    <Notify
                        stats={notify.stats}
                        content={notify.content}
                    />
                }
                <div className={`survey-send__loading ${loading}`}></div>
                <Modal
                    closeModal={this.props.closeModal}
                    titleHeader={this.renderTitleHeader()}
                    actionHeader={this.renderActionHeader()}
                    body={this.renderBody()}
                    descriptionFooter={this.renderDescriptionFooter()}
                    actionFooter={this.renderActionFooter()}
                />
            </>
        )
    }
}

export default connect(
    null,
    { settingSlackWebhookUrl }
)(ModalSaveSurvey);