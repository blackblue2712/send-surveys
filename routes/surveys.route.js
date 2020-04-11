const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = require("../models/surveys.model");
const SurveyDraft = require("../models/surveys-draft.model");
const _ = require("lodash");
const { URL } = require("url");
const { Path } = require("path-parser");
const slack = require("../services/slack");
const requireAuth = require("../middleware/requireAuth");


module.exports = app => {
    app.get("/services/surveys", requireAuth, async (req, res) => {
        const surveys = await Survey.find({ owner: req.user._id }).sort({ _id: -1 });
        res.json(surveys);
    });

    app.post("/services/surveys", requireAuth, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({ title, subject, body });
        survey.owner = req.user._id;
        survey.recipients = recipients.map(recipient => ({email: recipient}) );
        
        const mail = new Mailer(survey, surveyTemplate.defaultTemplate(survey));

        const response = await mail.send();
        console.log(response)
        if(response && response.statusCode === 202) {
            await survey.save();
            return res.status(200).json({ survey, status: "green", message: "Your surveys was sent" });
        } else {
            return res.json({ status: "danger", message: "Oops! Something went wrong" });
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
                console.log(response)
                if(response.nModified !== 0) {
                    slack.sendNotify({ email, surveyId, choice });
                }
            })
            .value()

        res.send({});

    })

    app.post("/services/surveys/save", requireAuth, async (req, res) => {
        const { name, title, subject, body, recipients } = req.body;
        const survey = await new SurveyDraft({ name, title, subject, body, recipients, owner: req.user._id }).save();

        return res.json({ status: "green", message: "Survey saved", survey });
    });

    app.get("/services/surveys/draft", requireAuth, async (req, res) => {
        console.log("get surveys draft from server")
        const surveys = await SurveyDraft.find({ owner: req.user._id }).sort({ _id: -1 });
        return res.json(surveys);
    })

    app.delete("/services/surveys/draft/:sid", requireAuth, async (req, res) => {
        console.log(req.params)
        await SurveyDraft.deleteOne({ _id: req.params.sid });
        res.send({});
    });
}
