
import axios from 'axios';

export const settingSlackWebhookUrl = async url => {
    console.log(url)
    const response = await axios.post("/services/slack/incomming", { slackIncommingWebhookUrl: url });
    console.log(response);

    return response;
}