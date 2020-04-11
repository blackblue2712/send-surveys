const User = require("../models/user.model");
const requireAuth = require("../middleware/requireAuth");
const slack = require("../services/slack");

module.exports = app => {
    app.post("/services/slack/incomming", requireAuth, async (req, res) => {
        const { slackIncommingWebhookUrl } = req.body;
        const statusCode = await slack.sendTestMessage(slackIncommingWebhookUrl);
        
        if(statusCode === 200) {
            await User.updateOne({ _id: req.user._id }, { slackIncommingWebhookUrl });
            return res.send({ message: "Success", status: "green", statusCode })
        } else {
            return res.send({ message: "Fail - check your url and try again", status: "danger", statusCode })
        }
    });
}