const sendgird = require("sendgrid");
const helper = sendgird.mail;
const keys = require("../config/keys");

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content, attachFiles) {
        super();

        this.sgApi = sendgird(keys.sendGridKey);

        this.from_email = new helper.Email("lars27399@gmail.com");
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAdresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();

        if(attachFiles.length > 0) {
            attachFiles.forEach(file => {
                let attachment = new helper.Attachment();
                attachment.setContent(file.blob);
                attachment.setFilename(file.name)
                attachment.setDisposition("attachment")
                this.addAttachment(attachment)
            })
        }
    }

    formatAdresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        })
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings)
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: this.toJSON()
        });


        try {
            const response = await this.sgApi.API(request);
            return response;
        } catch (err) {
            console.log(err.response.body.errors);
            return undefined;
        }
    }

}

module.exports = Mailer;