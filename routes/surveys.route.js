const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = require("../models/surveys.model");
const _ = require("lodash");
const { URL } = require("url");
const { Path } = require("path-parser");


module.exports = app => {
    app.get("/services/surveys", (req, res) => {
        console.log("req.user", req.user);
        return res.json(req.user);
    });

    app.post("/services/surveys", async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({ title, subject, body });
        survey.owner = req.user._id;
        survey.recipients = recipients.map(recipient => ({email: recipient}) );
        
        const mail = new Mailer(survey, surveyTemplate.defaultTemplate(survey));
        const response = await mail.send();
        if(response.statusCode === 202) {
            await survey.save();
            return res.status(200).json(survey);
        }
    });

    app.post("/services/surveys/webhook", async (req, res) => {
        const p = new Path("/services/surveys/:surveyId/:choice");
        const events = _.chain(req.body)
            .map(({ email, url }) => {
                const pathname = new URL(url).pathname;
                const match = p.test(pathname);
                if(match) {
                    return { email, ...match }
                }    
            })
            .compact()
            .uniqBy("email", "surveyId")
            .each( async ({ email, surveyId, choice }) => {
                const response = await Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: {
                                email,
                                responsed: false
                            }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { "recipients.$.responsed": true },
                        lastUpdate: Date.now()
                    }
                )
                console.log(response);
            })
            .value()

    })
}