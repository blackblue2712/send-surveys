const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    facebookId: String,
    givenName: String,
    familyName: String,
    photo: String,
    slackIncommingWebhookUrl: String
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;