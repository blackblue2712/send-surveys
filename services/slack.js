const keys = require("../config/keys");
const request = require("request");



module.exports.sendNotify = ({ email, surveyId, choice }, slackIncommingWebhookUrl) => {
    console.log(slackIncommingWebhookUrl);
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
                    "text": "*<http://localhost:3000/services/surveys/"+surveyId+"|[Check it now]>*\nYes (3)\n No (0)\n "+new Date().toLocaleString()+" "
                },
                "accessory": {
                    "type": "image",
                    "image_url": "https://res.cloudinary.com/daerg3axr/image/upload/v1586507720/wd0b1y8wg73w1fnyison.gif",
                    "alt_text": "thumbnail"
                }
            },
            {
                "type": "divider"
            }
        ]
    }
    // const webhookUri = keys.SLACK_INCOMMING_REQUEST_WEBHOOK;
    // const webhookUri = slackIncommingWebhookUrl;

    const postOptions = {
        uri: slackIncommingWebhookUrl,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: notfify
    }
    request(postOptions, function(err) {
        
    });
}

module.exports.sendTestMessage = async slackIncommingWebhookUrl => {
    const notfify = {
        "text": "Welcome!!!",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": ":coffee::coffee::coffee: Welcome to Liars survey! This is a message to test your slack webook url."
                }
            }
        ]
    }
    const postOptions = {
        uri: slackIncommingWebhookUrl,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: notfify
    }

    try {
        const response = await new Promise(resolve => {
            request(postOptions)
            .on("response", function(response) {
                resolve(response.statusCode);
            });
        });
        return response;
    } catch {
        return 400;
    }

}