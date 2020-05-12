import React from 'react';

import RecipinentsInput from './RecipientsInput';
import InputFormControl from '../input/InputFormControl';
import InputFiles from '../input/InputFiles';
import XLSX from '../readflies/XLSX';
import MenuSurveys from './MenuSurveys';
import { sendSurvey, saveSurvey } from '../../actions/surveys';
import { connect } from 'react-redux';
import Notify from '../notify/Notify';
import ModalSaveSurvey from '../modal/ModalSaveSurvey';
import MDE from '../editor/MDE';

import './Surveys.css';

class CreateSurvey extends React.Component {
    constructor() {
        super();

        this.recipients = [];
        this.recipientsViaFile = [];
        this.files = [];
        this.formData = new FormData();
        this.ips = React.createRef();
        this.isCheckTracking = React.createRef();
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

    componentDidMount() {
        this.isCheckTracking.current.checked = true;
    }

    getRecipients = callback => {
        this.recipients = callback();
    }
    getRecipientsViaExcel = callback => {
        console.log(callback())
        this.recipientsViaFile = callback();
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
        if (!this.recipients.length && !this.recipientsViaFile.length) {
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
            let combineRecipients = [...this.recipients, ...this.recipientsViaFile];
            combineRecipients = combineRecipients.filter((item, pos) => combineRecipients.indexOf(item) === pos);

            this.formData.delete("files[]");
            this.formData.append("title", title);
            this.formData.append("body", body);
            this.formData.append("subject", subject);
            this.formData.append("recipients", JSON.stringify(combineRecipients));
            this.formData.append("isTrackingData", this.isCheckTracking.current.checked);
            if(this.files.length > 0) {
                this.files.forEach(file => this.formData.append("files[]", file));
            }
            this.setState({ loading: "open" });

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

    resetForm = () => {
        this.setState({
            title: "",
            subject: "",
            body: "",
            errors: [],
            loading: "",
        });
        this.recipients = [];
        this.recipientsViaFile = [];

        this.formData.delete("title");
        this.formData.delete("body");
        this.formData.delete("subject");
        this.formData.delete("recipients");
        this.formData.delete("isTrackingData");
    }
    



    render() {
        const { title, subject, body, errors, loading, notify, openModal } = this.state;
        const recipients = this.recipients;
        const recipientsViaFile = this.recipientsViaFile;
        const files = this.files;
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
                        {/* <div className="help-text"><i>Please fill out the form before submit</i></div> */}
                    </div>
                    <div className="surveys__body">
                        <form onSubmit={ e => {e.preventDefault(); return false} } className="surveys__body-form">
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

                            <InputFiles initFiles={files} getFile={this.getFile} />
                            
                            <div className="form-control">
                                {errors.indexOf("recipients") !== -1 && this.renderError("recipients")}
                                <RecipinentsInput
                                    initRecipients={recipients}
                                    getRecipients={this.getRecipients}
                                />
                            </div>
                            < XLSX
                                initRecipients={recipientsViaFile}
                                getRecipientsViaExcel={ this.getRecipientsViaExcel }
                            />

                            <div className="form-control">
                                <label htmlFor="isTracking">Add two button to tracking data?</label>
                                <input
                                    ref={this.isCheckTracking}
                                    type="checkbox" name="isTracking" id="isTracking"
                                />
                            </div>
                        </form>
                        <div >
                            <button
                                className="btn btn-outline btn-green btn-bold"
                                onClick={this.sendSurvey}
                                style={{marginRight: "24px"}}
                            >
                                <i className="ti-location-arrow"></i> Send Now 
                            </button>
                            <button
                                className="btn btn-outline btn-danger btn-bold"
                                onClick={this.resetForm}
                            >
                                <i className="ti-reload"></i> Reset 
                            </button>
                        </div>
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