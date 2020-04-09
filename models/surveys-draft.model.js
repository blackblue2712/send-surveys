const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const surveysDraftSchema = new Schema({
    owner: {
        type: ObjectId,
        ref: "user"
    },
    title: String,
    subject: String,
    body: String,
    recipients: {
        Type: Array
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

const surveysDraft = mongoose.model("surveys-draft", surveysDraftSchema);

module.exports = surveysDraft;
