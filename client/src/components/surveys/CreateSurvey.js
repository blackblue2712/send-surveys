import React from 'react';
import RecipinentsInput from './RecipientsInput';
import InputFormControl from '../input/InputFormControl';
import TextareaFormControl from '../input/TextareaFormControl';
import MenuSurveys from './MenuSurveys';
import { sendSurvey } from '../../actions/surveys';
import { connect } from 'react-redux';

class CreateSurvey extends React.Component {
    constructor() {
        super();

        this.recipients = [];
        this.state = {
            title: "",
            subject: "",
            body: "",
            errors: []
        }
    }

    getRecipients = callback => {
        this.recipients = callback();

    }

    validateData = async () => {
        await this.setState({ errors: [] });
        let errors = [];
        let { title, body, subject } = this.state;
        if (!title) {
            errors.push("title");
        }
        if (!subject) {
            errors.push("subject");
        }
        if (!body) {
            errors.push("body");
        }
        if (!this.recipients.length) {
            errors.push("recipients");
        }

        if(errors.length) {
            await this.setState({ errors: [...this.state.errors, ...errors] });
        }
    }

    setValue = (type, value) => {
        let errors = this.state.errors;
        errors.indexOf(type) !== -1 && errors.splice(errors.indexOf(type), 1);
        
        this.setState({ [type]: value, errors: errors })
    }

    renderError = text => {
        return (
            <div className="surveys__body-validate">
                <div className="content">Missing {text}</div>
            </div>
        )
    }

    sendSurvey = async () => {
        await this.validateData();
        if (!this.state.errors.length) {
            
            const response = await this.props.sendSurvey({ ...this.state, recipients: this.recipients, errors: undefined });
            console.log(response)
        }
    }



    render() {
        const { title, subject, body, errors } = this.state;
        return (
            <main>
                <section id="features-surveys">
                    <MenuSurveys />
                    <div className="surveys__header">
                        <h1>Send Surveys</h1>
                    </div>
                    <div className="surveys__body">
                        <form onSubmit={ e => e.preventDefault() } className="surveys__body-form">
                            <InputFormControl name={"title"} labelName={"title"} setValue={this.setValue} errors={errors} value={title} />
                            <InputFormControl name={"subject"} labelName={"subject"} setValue={this.setValue} errors={errors} value={subject} />
                            <TextareaFormControl name={"body"} labelName={"body"} setValue={this.setValue} errors={errors} value={body} />

                            <div className="form-control">
                                {errors.indexOf("recipients") !== -1 && this.renderError("recipients")}
                                <RecipinentsInput getRecipients={this.getRecipients} />
                            </div>
                            <div className="help-text"><i>Please fill out the form before submit</i></div>
                        </form>
                        <button
                            className="btn btn-outline btn-green btn-bold"
                            onClick={this.sendSurvey}
                        >
                            <i className="ti-location-arrow"></i> Send Now 
                        </button>

                    </div>
                    <div className="surveys__image">
                    </div>

                </section>
            </main>
        )
    }
}

export default connect(
    null,
    { sendSurvey }
)(CreateSurvey);