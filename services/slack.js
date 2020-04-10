const keys = require("../config/keys");
const request = require("request");



module.exports.sendNotify = ({ email, surveyId, choice }) => {
    const notfify = {
        "text": email + " was responsed your survey",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":coffee::coffee::coffee: *" + email + "* was responsed *"+choice+"* to your survey"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*<http://localhost:3000/services/"+surveyId+"|[Check it now]>*\nYes (3)\n No (0)\n "+new Date().toLocaleString()+" "
                },
                "accessory": {
                    "type": "image",
                    "image_url": "https://res.cloudinary.com/daerg3axr/image/upload/v1586507720/wd0b1y8wg73w1fnyison.gif",
                    "alt_text": "calendar thumbnail"
                }
            },
            {
                "type": "divider"
            }
        ]
    }
    webhookUri = keys.SLACK_INCOMMING_REQUEST_WEBHOOK;

    const postOptions = {
        uri: webhookUri,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: notfify
    }

    request(postOptions);
}