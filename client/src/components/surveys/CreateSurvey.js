import React from 'react';
import RecipinentsInput from './RecipientsInput';
import InputFormControl from '../input/InputFormControl';
import InputFiles from '../input/InputFiles';
import MenuSurveys from './MenuSurveys';
import { sendSurvey, saveSurvey } from '../../actions/surveys';
import { connect } from 'react-redux';
import Notify from '../notify/Notify';
import ModalSaveSurvey from '../modal/ModalSaveSurvey';
import MDE from '../editor/MDE';

class CreateSurvey extends React.Component {
    constructor() {
        super();

        this.recipients = [];
        this.files = [];
        this.formData = new FormData();
        this.ips = React.createRef();
        this.state = {
            title: "",
            subject: "",
            body: "",
            errors: [],
            loading: "",
            notify: false,
            openModal: false
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

    getFile = callback => {
        this.files = callback();
    }

    sendSurvey = async () => {
        await this.validateData();
        if (!this.state.errors.length) {
            const { title, body, subject } = this.state;
            this.formData.delete("files[]");
            this.formData.append("title", title);
            this.formData.append("body", body);
            this.formData.append("subject", subject);
            this.formData.append("recipients", JSON.stringify(this.recipients));
            if(this.files.length > 0) {
                this.files.forEach(file => this.formData.append("files[]", file));
            }
            this.setState({ loading: "open" });

            console.log(this.formData.getAll("files[]"))

            const response = await this.props.sendSurvey(this.formData);

            this.setState({
                loading: "", title: "", notify: { content: response.payload.message, stats: response.payload.status }
            });

            setTimeout(() => {
                this.setState({ notify: false })
            }, 4500)
        }
    }

    openSaveSurvey = () => {
        if (this.recipients.length) {
            this.setState({ openModal: true });
        } else {
            this.setState({ errors: ["recipients"] });
        }
    }

    saveSurvey = async name => {
        this.setState({ loading: "open" });
        const { title, body, subject } = this.state;
        const response = await this.props.saveSurvey({ title, body, subject, recipients: this.recipients, name: name || undefined });

        this.setState({
            openModal: false, loading: "",
            notify: { content: response.payload.message, stats: response.payload.status }
        });

        setTimeout(() => {
            this.setState({ notify: false })
        }, 4500)
    }

    loadSurveyDraft = sid => {
        const loadedSurvey = this.props.surveysDraft.find(sv => sv._id === sid);
        
        if(loadedSurvey) {
            this.recipients = loadedSurvey.recipients
            this.setState({
                title: loadedSurvey.title,
                subject: loadedSurvey.subject,
                body: loadedSurvey.body
            });
        }
    }
    



    render() {
        const { title, subject, body, errors, loading, notify, openModal } = this.state;
        const recipients = this.recipients;
        return (
            <main style={{marginTop: "0"}}>
                <section className="features-surveys">
                    {
                        notify &&
                        <Notify
                            stats={notify.stats}
                            content={notify.content}
                        />
                    }
                    {
                        openModal &&
                        <ModalSaveSurvey
                            closeModal={() => this.setState({ openModal: false })}
                            saveSurvey={this.saveSurvey}
                        />
                    }
                    <div className={`survey-send__loading ${loading}`}></div>
                    
                    <MenuSurveys
                        saveSurvey={this.openSaveSurvey}
                        loadSurveyDraft={this.loadSurveyDraft}
                    />
                    <div className="surveys__header">
                        {/* <h1>Send Surveys</h1> */}
                        <h3>Send Surveys</h3>
                    </div>
                    <div className="surveys__body">
                        <form onSubmit={ e => e.preventDefault() } className="surveys__body-form">
                            <InputFormControl
                                name={"title"}
                                labelName={"title"}
                                setValue={this.setValue}
                                errors={errors}
                                value={title}
                            />
                            <InputFormControl
                                name={"subject"}
                                labelName={"subject"}
                                setValue={this.setValue}
                                errors={errors}
                                value={subject}
                            />

                            <MDE
                                setValue={this.setValue}
                                value={body}
                                name="body"
                                labelName="body"
                                errors={errors}
                            />

                            <InputFiles getFile={this.getFile} />

                            <div className="form-control">
                                {errors.indexOf("recipients") !== -1 && this.renderError("recipients")}
                                <RecipinentsInput
                                    initRecipients={recipients}
                                    getRecipients={this.getRecipients}
                                />
                            </div>
                            <div className="help-text"><i>Please fill out the form before submit</i></div>
                        </form>
                        <button
                            className="btn btn-outline btn-green btn-bold"
                            onClick={this.sendSurvey}
                        >
                            <i className="ti-location-arrow"></i> Send Now 
                        </button>
                        <div className="surveys__background">
                        </div>
                    </div>
                    
                </section>
            </main>
        )
    }
}

const mapStateToProps = state => {
    return { surveysDraft: state.surveysDraft }
}

export default connect(
    mapStateToProps,
    { sendSurvey, saveSurvey }
)(CreateSurvey);